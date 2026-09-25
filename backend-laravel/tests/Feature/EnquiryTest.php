<?php

namespace Tests\Feature;

use App\Mail\EnquiryReceived;
use App\Mail\EnquiryThankYou;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class EnquiryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        config(['enquiries.recipient' => 'enquiries@example.com']);
    }

    private function enquiry(array $overrides = []): array
    {
        return array_merge([
            'full_name' => 'Test Visitor',
            'work_email' => 'visitor@example.com',
            'phone_number' => '+919000000000',
            'company_name' => 'Example Company',
            'message' => 'We would like to discuss an embedded systems project.',
        ], $overrides);
    }

    public function test_it_stores_an_enquiry_in_the_existing_table_shape(): void
    {
        $payload = $this->enquiry();

        $this->postJson('/api/enquiries', $payload)
            ->assertCreated()
            ->assertExactJson(['message' => 'Thank you! Your enquiry has been received.']);

        $this->assertDatabaseHas('enquiries', $payload);
        $this->assertNotNull(DB::table('enquiries')->first()->created_at);
        $this->assertFalse(Schema::hasColumn('enquiries', 'updated_at'));
        Mail::assertQueued(EnquiryReceived::class, fn ($mail) => $mail->hasTo('enquiries@example.com')
            && $mail->enquiry->work_email === $payload['work_email']);
        Mail::assertQueued(EnquiryThankYou::class, fn ($mail) => $mail->hasTo($payload['work_email']));
        Mail::assertQueuedCount(2);
    }

    public function test_optional_details_can_be_omitted_and_extra_fields_are_ignored(): void
    {
        $payload = $this->enquiry(['id' => 500, 'created_at' => '2000-01-01 00:00:00']);
        unset($payload['phone_number'], $payload['company_name']);

        $this->postJson('/api/enquiries', $payload)->assertCreated();

        $row = DB::table('enquiries')->first();
        $this->assertNull($row->phone_number);
        $this->assertNull($row->company_name);
        $this->assertNotEquals(500, $row->id);
        $this->assertNotEquals('2000-01-01 00:00:00', $row->created_at);
    }

    public function test_invalid_input_is_rejected_without_saving(): void
    {
        $this->postJson('/api/enquiries', $this->enquiry([
            'full_name' => '   ',
            'work_email' => 'not-an-email',
            'phone_number' => str_repeat('1', 26),
            'company_name' => str_repeat('a', 201),
            'message' => '',
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors(['full_name', 'work_email', 'phone_number', 'company_name', 'message']);

        $this->assertDatabaseCount('enquiries', 0);
        Mail::assertNothingQueued();
    }

    public function test_required_field_limits_are_enforced(): void
    {
        $this->postJson('/api/enquiries', $this->enquiry([
            'full_name' => str_repeat('a', 151),
            'work_email' => str_repeat('a', 255).'@example.com',
            'message' => str_repeat('a', 10001),
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors(['full_name', 'work_email', 'message']);

        $this->assertDatabaseCount('enquiries', 0);
    }

    public function test_existing_enquiries_survive_running_the_migration_again(): void
    {
        DB::table('enquiries')->insert($this->enquiry());
        $migration = require database_path('migrations/2026_09_16_000000_create_enquiries_table.php');

        $migration->up();

        $this->assertDatabaseCount('enquiries', 1);
        $this->assertDatabaseHas('enquiries', $this->enquiry());
    }

    public function test_database_errors_return_a_generic_failure(): void
    {
        Schema::drop('enquiries');

        $this->postJson('/api/enquiries', $this->enquiry())
            ->assertStatus(503)
            ->assertExactJson(['message' => 'We could not save your enquiry. Please try again later.']);
        Mail::assertNothingQueued();
    }

    public function test_repeated_requests_are_rate_limited(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->postJson('/api/enquiries', $this->enquiry())->assertCreated();
        }

        $this->postJson('/api/enquiries', $this->enquiry())->assertStatus(429);
        $this->assertDatabaseCount('enquiries', 5);
    }
}
