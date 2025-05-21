const sessionDetails = async (sessionToken) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              clientId: process.env.OTPLESS_CLIENT_ID,
              clientSecret: process.env.OTPLESS_SECERT_ID,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionToken : sessionToken})
          };
        
        const response = await fetch('https://user-auth.otpless.app/v1/sessions/get-session-details', options)
        data = await response.json();
        console.log(data);

       return data;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {sessionDetails};