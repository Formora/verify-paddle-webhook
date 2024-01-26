import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

import { verifySignature } from "./mod.ts";

const paddleSignature =
  "ts=1692730519;h1=8061ab9ade34e61da50d5cd2947b64fe6b3cd79dc0676fbc9a03f4f4f8882aef";

const paddlePayload =
  '{ "data": { "id": "sub_01h84qezffcfrjx275ve304rt0", "status": "active", "customer_id": "ctm_01h82et3vctdaapjzerb3xrkex", "address_id": "add_01h84qdjewtveve149393qfqcz", "business_id": null, "currency_code": "USD", "created_at": "2023-08-18T16:25:40.591Z", "updated_at": "2023-08-18T16:25:40.591Z", "started_at": "2023-08-18T16:25:38.870962Z", "first_billed_at": "2023-08-18T16:25:38.870962Z", "next_billed_at": "2023-09-18T16:25:38.870962Z", "paused_at": null, "canceled_at": null, "collection_mode": "automatic", "billing_details": null, "current_billing_period": { "starts_at": "2023-08-18T16:25:38.870962Z", "ends_at": "2023-09-18T16:25:38.870962Z" }, "import_meta": null, "billing_cycle": { "frequency": 1, "interval": "month" }, "scheduled_change": null, "items": [ { "status": "active", "quantity": 10, "recurring": true, "created_at": "2023-08-18T16:25:40.591Z", "updated_at": "2023-08-18T16:25:40.591Z", "previously_billed_at": "2023-08-18T16:25:38.870962Z", "next_billed_at": "2023-09-18T16:25:38.870962Z", "trial_dates": null, "price": { "id": "pri_01gsz8x8sawmvhz1pv30nge1ke", "product_id": "pro_01gsz4t5hdjse780zja8vvr7jg", "description": "Monthly (per seat)", "tax_mode": "account_setting", "billing_cycle": { "frequency": 1, "interval": "month" }, "trial_period": null, "unit_price": { "amount": "3570", "currency_code": "USD" } } }, { "status": "active", "quantity": 1, "recurring": true, "created_at": "2023-08-18T16:25:40.591Z", "updated_at": "2023-08-18T16:25:40.591Z", "previously_billed_at": "2023-08-18T16:25:38.870962Z", "next_billed_at": "2023-09-18T16:25:38.870962Z", "trial_dates": null, "price": { "id": "pri_01gsz95g2zrkagg294kpstx54r", "product_id": "pro_01gsz92krfzy3hcx5h5rtgnfwz", "description": "Monthly (recurring addon)", "tax_mode": "account_setting", "billing_cycle": { "frequency": 1, "interval": "month" }, "trial_period": null, "unit_price": { "amount": "29750", "currency_code": "USD" } } } ], "custom_data": null, "management_urls": { "update_payment_method": "https://buyer-portal.paddle.com/subscriptions/sub_01h84qezffcfrjx275ve304rt0/update-payment-method", "cancel": "https://buyer-portal.paddle.com/subscriptions/sub_01h84qezffcfrjx275ve304rt0/cancel" }, "discount": null }, "meta": { "request_id": "64b7ca32-deae-4575-98e4-86d4c0f79f57" } }';

const secretKey =
  "pdl_ntfset_01h8f7cd25d9tyvfz4068g2c1j_3Mmf+3phZmxURAFWsBwrQeFcbSMbmLRF";

Deno.test("Valid webhook", async (): Promise<void> => {
  const valid = await verifySignature(
    paddleSignature,
    paddlePayload,
    secretKey,
  );
  assertEquals(valid, true);
});

Deno.test("Invalid webhook", async (): Promise<void> => {
  const valid = await verifySignature(
    paddleSignature,
    paddlePayload,
    "invalid-signature",
  );
  assertEquals(valid, false);
});
