export const CertificationsBanner = () => {
    return (
        <section className="w-full h-[100vh] relative overflow-hidden">
            {/* Full Cover Image */}
            <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
                alt="Banner"
                className="w-full h-full object-cover"
            />

            {/* Optional subtle overlay for depth */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </section>
    );
};
