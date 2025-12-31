export default function Footer() {
	return (
		<div className="footer-bgcolor">
			<footer className="footer text-center">
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-4 mb-3 mb-md-0">
							<strong>JohnPepper</strong><br />
							<span>Peperoncini dal 2025</span>
						</div>
						<div className="col-12 col-md-4 mb-3 mb-md-0">
							<a href="mailto:info@johnpepper.com" className="footer-link">info@johnpepper.com</a><br />
							<a href="tel:+39123456789" className="footer-link">+39 123 456789</a>
						</div>
						<div className="col-12 col-md-4">
							<span>© {new Date().getFullYear()} JohnPepper. Tutti i diritti riservati.</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}