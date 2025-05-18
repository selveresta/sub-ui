import React, { useState } from "react";
import "./App.css";

function App() {
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("Kyiv");
	const [frequency, setFrequency] = useState("hourly");
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		setLoading(true);
		try {
			const res = await fetch(`/subscribe`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, city, frequency }),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(`${res.status}: ${text}`);
			}
			setMessage("✅ Subscription request sent! Check your email to confirm.");
			setEmail("");
		} catch (err) {
			setMessage(`❌ ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='App'>
			<form className='form' onSubmit={handleSubmit}>
				<h1>Weather Subscription</h1>

				<label>
					Email
					<input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>

				<label>
					City
					<select required value={city} onChange={(e) => setCity(e.target.value)}>
						<option>Kyiv</option>
						<option>London</option>
						<option>New York</option>
						<option>Tokyo</option>
					</select>
				</label>

				<label>
					Frequency
					<select
						required
						value={frequency}
						onChange={(e) => {
							console.log(e.target.value);
							setFrequency(e.target.value);
						}}
					>
						<option value='hourly'>Hourly</option>
						<option value='daily'>Daily</option>
					</select>
				</label>

				<button type='submit' disabled={loading}>
					{loading ? "Submitting…" : "Subscribe"}
				</button>

				{message && <p className='message'>{message}</p>}
			</form>
		</div>
	);
}

export default App;
