import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setAuthed }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 ">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex bg-indigo-600 text-white rounded-xl w-10 h-10 items-center justify-center text-lg font-black mb-3">L</div>
          <h1 className="text-xl font-bold text-gray-800">Lost&amp;Found</h1>
          <p className="text-sm text-gray-500">Welcome back — sign in to continue</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">University Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@university.edu" type="email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type="password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded" /> Remember me</label>
            <button className="text-indigo-600 hover:underline">Forgot password?</button>
          </div>
          <button onClick={() => { setAuthed(true); navigate("/"); }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-blue-600 font-semibold py-2.5 rounded-xl transition-colors text-sm">
            Sign In
          </button>
          {/* <p className="text-center text-xs text-gray-400">Don't have an account? <button className="text-indigo-600 hover:underline">Sign up</button></p> */}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
}
export default Login;