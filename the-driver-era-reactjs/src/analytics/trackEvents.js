export const trackGTMEvents = (eventName, ecommerceData = null) => {
    window.dataLayer = window.dataLayer || [];

    const payload = {
        event: eventName,
        timestamp: new Date().toISOString(),
    };

    if (ecommerceData) {
        payload.ecommerce = {
            ...ecommerceData
        };
    }

    window.dataLayer.push(payload);
    console.log(`%c[GTM Ecommerce]: ${eventName}`, "color: #4285f4; font-weight: bold", payload);
};