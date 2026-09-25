<?php

namespace Tests\Feature;

use App\Mail\EnquiryReceived;
use App\Mail\EnquiryThankYou;
use App\Models\Enquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class EnquiryMailTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'queue.default' => 'database',
            'mail.default' => 'array',
            'enquiries.recipient' => 'enquiries@example.com',
        ]);
    }

    private function payload(): array
    {
        return [
            'full_name' => 'Test Visitor',
            'work_email' => 'visitor@example.com',
            'phone_number' => '+919000000000',
            'company_name' => 'Example Company',
            'message' => 'Please discuss our project. <script>alert(1)</script>',
        ];
    }

    public function test_two_persistent_jobs_deliver_to_the_correct_recipients(): void
    {
        $this->postJson('/api/enquiries', $this->payload())->assertCreated();
        $this->assertDatabaseCount('jobs', 2);
        $this->assertDatabaseCount('enquiries', 1);

        for ($index = 0; $index < 2; $index++) {
            $job = Queue::connection()->pop('enquiries');
            $this->assertNotNull($job);
            $job->fire();
            $job->delete();
        }

        $messages = Mail::mailer()->getSymfonyTransport()->messages();
        $this->assertCount(2, $messages);
        $notification = $messages[0]->getOriginalMessage();
        $receipt = $messages[1]->getOriginalMessage();
        $this->assertSame('enquiries@example.com', $notification->getTo()[0]->getAddress());
        $this->assertSame('visitor@example.com', $notification->getReplyTo()[0]->getAddress());
        $this->assertSame('New website enquiry', $notification->getSubject());
        $this->assertStringNotContainsString('Reference', $notification->getHtmlBody());
        foreach (['Test Visitor', 'visitor@example.com', '+919000000000', 'Example Company', 'Please discuss our project.'] as $detail) {
            $this->assertStringContainsString($detail, $notification->getHtmlBody());
        }
        $this->assertStringNotContainsString('<script>', $notification->getHtmlBody());
        $this->assertSame('visitor@example.com', $receipt->getTo()[0]->getAddress());
        $this->assertSame('enquiries@example.com', $receipt->getReplyTo()[0]->getAddress());
        $this->assertStringContainsString('Thank you', $receipt->getSubject());
        $this->assertStringNotContainsString('reference', strtolower($receipt->getHtmlBody()));
        $this->assertDatabaseCount('jobs', 0);
    }

    public function test_missing_queue_table_does_not_leave_an_enquiry_without_emails(): void
    {
        Schema::drop('jobs');

        $this->postJson('/api/enquiries', $this->payload())->assertStatus(503);

        $this->assertDatabaseCount('enquiries', 0);
        $this->assertCount(0, Mail::mailer()->getSymfonyTransport()->messages());
    }

    public function test_rolling_back_an_enquiry_also_rolls_back_both_emails(): void
    {
        DB::beginTransaction();
        $this->postJson('/api/enquiries', $this->payload())->assertCreated();
        $this->assertDatabaseCount('jobs', 2);
        DB::rollBack();

        $this->assertDatabaseCount('enquiries', 0);
        $this->assertDatabaseCount('jobs', 0);
    }

    public function test_templates_support_missing_optional_details_and_retry_delivery(): void
    {
        $enquiry = Enquiry::create([
            'full_name' => 'Test Visitor',
            'work_email' => 'visitor@example.com',
            'message' => 'Hello',
        ]);
        $notification = new EnquiryReceived($enquiry);
        $receipt = new EnquiryThankYou($enquiry);

        $notification->assertSeeInHtml('Not provided');
        $receipt->assertSeeInHtml('Hello Test Visitor');
        $this->assertSame(3, $notification->tries);
        $this->assertSame([60, 300], $notification->backoff);
        $this->assertSame(3, $receipt->tries);
        $this->assertSame([60, 300], $receipt->backoff);
    }
}
