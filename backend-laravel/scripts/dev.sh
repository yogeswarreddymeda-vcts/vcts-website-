#!/usr/bin/env bash

set -u

backend_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
frontend_dir="$(cd "$backend_dir/../frontend-react" && pwd)"
process_ids=()

cleanup() {
    trap - EXIT INT TERM

    for process_id in "${process_ids[@]}"; do
        kill "$process_id" 2>/dev/null || true
    done

    wait 2>/dev/null || true
}

trap cleanup EXIT INT TERM

cd "$backend_dir"
php artisan serve --host=127.0.0.1 --port=8001 --tries=1 &
process_ids+=("$!")

php artisan queue:work --queue=enquiries --sleep=1 --tries=3 --timeout=60 &
process_ids+=("$!")

npm --prefix "$frontend_dir" run dev:frontend &
process_ids+=("$!")

exit_status=0
wait -n "${process_ids[@]}" || exit_status=$?
exit "$exit_status"
