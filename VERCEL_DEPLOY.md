# Quick Start - Deploy to Vercel

## 1️⃣ Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (the LONG key)

---

## 2️⃣ Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select **limitless-web** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**

**Variable 1:**
```
Key: VITE_SUPABASE_URL
Value: [paste your Project URL]
Environments: ✅ Production ✅ Preview ✅ Development
```

**Variable 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: [paste your anon key]
Environments: ✅ Production ✅ Preview ✅ Development
```

5. Click **Save**

---

## 3️⃣ Redeploy

1. Go to **Deployments** tab
2. Click **⋯** on latest deployment
3. Click **Redeploy**
4. Wait ~1 minute for build

---

## 4️⃣ Test

1. Visit `new.limitlesscruises.com`
2. No more "supabaseUrl is required" error! ✅
3. Fill out contact form
4. Submit
5. Should see "Thank you!" message

---

## 5️⃣ Verify in Supabase

1. Go to Supabase → **Table Editor**
2. Select `crm.website_enquiries`
3. Your test submission should appear! 🎉

---

## Done! 🚀

Your website is now:
- ✅ Live at new.limitlesscruises.com
- ✅ Accepting contact form submissions
- ✅ Storing data securely in Supabase
- ✅ Ready for domain transfer when you're ready

**Next:** Create storage buckets (see SUPABASE_SETUP.md) or transfer to main domain

