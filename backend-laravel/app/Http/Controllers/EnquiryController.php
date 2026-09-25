<?php

namespace App\Http\Controllers;

use App\Mail\EnquiryReceived;
use App\Mail\EnquiryThankYou;
use App\Models\Enquiry;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:150'],
            'work_email' => ['required', 'email', 'max:254'],
            'phone_number' => ['nullable', 'string', 'max:16', 'regex:/^\+[1-9]\d{6,14}$/'],
            'company_name' => ['nullable', 'string', 'max:200'],
            'message' => ['required', 'string', 'max:10000'],
        ]);

        try {
            // Save the enquiry and both database-queue jobs atomically. SMTP
            // delivery happens in the worker and can retry independently.
            DB::transaction(function () use ($validated): void {
                $enquiry = Enquiry::create($validated);

                Mail::to(config('enquiries.recipient'))->queue(new EnquiryReceived($enquiry));
                Mail::to($enquiry->work_email)->queue(new EnquiryThankYou($enquiry));
            });
        } catch (QueryException $exception) {
            report($exception);

            return response()->json([
                'message' => 'We could not save your enquiry. Please try again later.',
            ], 503);
        }

        return response()->json([
            'message' => 'Thank you! Your enquiry has been received.',
        ], 201);
    }
}
