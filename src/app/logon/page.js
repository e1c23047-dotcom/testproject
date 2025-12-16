'use client'


import { useState } from 'react'


export default function SignUpPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900">
<div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
<h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
アカウント作成
</h1>


<form className="space-y-5">
<div>
<label className="block text-sm text-gray-300 mb-1">Email</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="you@example.com"
className="w-full px-4 py-3 rounded-xl bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>


<div>
<label className="block text-sm text-gray-300 mb-1">Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="••••••••"
className="w-full px-4 py-3 rounded-xl bg-black/40 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>


<button
type="submit"
className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-white tracking-wide"
>
作成
</button>
</form>


<p className="text-center text-gray-400 text-sm mt-6">
もうすでにアカウントをお持ちですか？{' '}
<a href="/login" className="text-indigo-400 hover:underline">
ログイン
</a>
</p>
</div>
</div>
)
}