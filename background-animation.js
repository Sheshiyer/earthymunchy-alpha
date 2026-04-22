document.addEventListener("DOMContentLoaded", () => {
    // Fluid Orbs Physics
    const orbs = document.querySelectorAll('.orb');

    if (orbs.length === 0) return;

    // Random Ambient Drift
    orbs.forEach(orb => {
        gsap.to(orb, {
            x: "random(-100, 100)",
            y: "random(-100, 100)",
            duration: "random(10, 20)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    });

    // Mouse Follow with Lag (Liquid Feel)
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100; // -50 to 50
        const y = (e.clientY / window.innerHeight - 0.5) * 100;

        gsap.to('.orb-1', { xPercent: x * 0.5, yPercent: y * 0.5, duration: 2, ease: "power2.out" });
        gsap.to('.orb-2', { xPercent: x * -0.5, yPercent: y * -0.5, duration: 2.5, ease: "power2.out" });
        gsap.to('.orb-3', { xPercent: x * 0.3, yPercent: y * -0.3, duration: 3, ease: "power2.out" });
    });
});
