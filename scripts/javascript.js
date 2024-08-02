document.addEventListener('DOMContentLoaded', function() {
    const clientId = '6ag5edndut9zwv0n75gova2ja0ubn4';
    const token = 'bvmx8chxta7umqqif7sdn3wroihegf';
    const channelName = 'northwesternesports';
    const button = document.getElementById('twitchButton');

    async function checkStreamStatus() {
        const url = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;
        const headers = {
            'Client-ID': clientId,
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(url, { headers });
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                button.classList.remove('offline');
                button.classList.add('live');
                button.textContent = 'Live Now!';
                button.disabled = false; // Enable the button if live
            } else {
                button.classList.remove('live');
                button.classList.add('offline');
                button.textContent = 'Currently Offline';
                button.disabled = true; // Disable the button if not live
            }
        } catch (error) {
            console.error('Error fetching stream status:', error);
            button.textContent = 'Error';
        }
    }

    checkStreamStatus();
});