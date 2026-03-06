export const trackGTMEvents = (eventName, eventParams = {}) => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: eventName,
        ...eventParams,
        timestamp: new Date().toISOString(),
    });

    // Este log es clave para que vos veas que funciona sin abrir GTM
    console.log(`%c[GTM Event]: ${eventName}`, "color: #4285f4; font-weight: bold", eventParams);
};