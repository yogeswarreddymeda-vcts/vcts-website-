<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    // The existing MySQL table has created_at, but no updated_at column.
    public const UPDATED_AT = null;

    protected $fillable = [
        'full_name',
        'work_email',
        'phone_number',
        'company_name',
        'message',
    ];
}
