# Paddle Webhook Verifier for Deno

Verify Paddle webhook signatures in Deno.

## Usage
Signatures can be verified as follows:

```typescript
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { verifySignature } 'https://deno.land/x/verify_paddle_webhook@v.0.0.3/mod.ts';

serve(async (req) => {
  const secretKey = Deno.env.get(PADDLE_WEBHOOK_SECRET);

  const signature = req.headers.get("Paddle-Signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.text();

  const validSignature = await verifySignature(signature, body, secretKey);

  if (!validSignature) {
    return new Response("Invalid signature", { status: 401 });
  }

  // Webhook was successfully verified, continue with your custom code...
  return new Response();
});
```

## License

[verify_paddle_webhook](https://github.com/Formora/verify_paddle_webhook/) is released under the
MIT License. See the bundled [LICENSE](./LICENSE) file for details.
