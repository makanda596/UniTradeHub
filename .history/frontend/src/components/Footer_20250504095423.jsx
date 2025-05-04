const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-white">Unitrade Hub</h2>
                    <p className="mt-2 text-sm">Your trusted partner in efficient and innovative trading solutions.</p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-2">Company</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Partners</a></li>
                        <li><a href="/terms" target="_blank" className="hover:underline">Our terms and condition</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-2">Support</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="/contact" target="_blank" className="hover:underline">Contact Us</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-2">Stay Connected</h3>
                    <form className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-3 py-2 rounded-md text-gray-900 focus:outline-none"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                &copy; {new Date().getFullYear()} Unitrade Hub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
