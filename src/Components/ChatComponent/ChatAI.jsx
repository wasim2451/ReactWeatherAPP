import React, { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
});

function ChatAI({ weatherData }) {
    // Ref to store the latest timestamp
    const timestampRef = useRef(null);
    const [recommendations, setRecommendations] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (weatherData.city) {
            console.log("TRUE");
            // Generate and store the timestamp in the ref
            const timestamp_TEMP = Date.now();
            timestampRef.current = timestamp_TEMP;

            // Fetch recommendations using the latest weather data and timestamp
            fetchRecommendations(weatherData.city, timestamp_TEMP);
        }
    }, [weatherData]);

    useEffect(() => {
        if (data && recommendations) {
            type(data, recommendations);
        }
    }, [data, recommendations]);

    const type = (city, info) => {
        const res = [`${info}`];
        let speed = 13;
        let textPosition = 0;
        const typewriter = () => {
            document.getElementById('text-Container').innerHTML =
                res[0].substring(0, textPosition) + "<span id='blinker'>\u25ae</span>";
            textPosition++;
            if (textPosition > res[0].length) {
                document.getElementById('blinker').remove();
            } else {
                setTimeout(typewriter, speed);
            }
        }
        typewriter();
    }

    const fetchRecommendations = async (city, timestamp_TEMP) => {
        console.log("Fetching recommendations for:", city);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a creative assistant specialized in providing weather-based recommendations.',
                },
                {
                    role: 'user',
                    content: `
                    I live in ${city} and would love some weather-based activity recommendations! 
                    Please provide the suggestions in a visually appealing HTML format with these guidelines:

                    1. **Bullet Points:** Each recommendation should start with a bullet point and an appropriate emoji that reflects the weather condition.
                    2. **Rich Text Formatting:** Use HTML tags like <b> for bold text and <i> for italics to emphasize important parts of each recommendation.
                    3. **Paragraph Structure:** Each recommendation should be enclosed within its own <p> tag to ensure clear separation.
                    4. **Line Breaks:** Use <br> tags if needed to improve readability and add a natural flow to the recommendations.
                    5. **Color and Style:** Feel free to incorporate some inline CSS styles, like color or font changes, to match the mood of the weather (e.g., blue for rainy days, yellow for sunny days). Colourful text would look great.
                    6. **Playful Tone:** Keep the tone friendly and engaging, like you’re giving advice to a friend.
                    7. Do not exceed 150 words. Make content within that limit.
                    Here’s an example to guide you:
                    8.Show reccomendations for both Night and Day time.

                    <p>🌞 <b>Soak up the sun!</b> <br> The weather is perfect for a <i>picnic in the park</i>. Don’t forget your sunglasses!</p>
                    <p>☔ <b>Stay cozy indoors.</b> <br> It’s a rainy day, so maybe it’s time to <i>curl up with a good book</i> or watch a movie.</p>
                    <p>🌬️ <b>Windy weather ahead!</b> <br> Take a stroll, but don’t forget your <i>warm jacket</i> and maybe grab a hot coffee on the way.</p>
                    
                    Please ensure the recommendations are formatted in a similar style. I’m looking forward to seeing what you suggest!
                `,
                }
            ],
            model: 'llama3-8b-8192',
            temperature: 1,
            max_tokens: 250,
            top_p: 1,
            stream: true,
            stop: null,
        });

        let recommendationString = '';

        for await (const chunk of chatCompletion) {
            recommendationString += chunk.choices[0]?.delta?.content || '';
        }

        // Check if the timestamp matches the latest timestamp stored in the ref
        if (timestamp_TEMP === timestampRef.current) {
            setRecommendations(recommendationString);
            setData(city); // Storing the current city
            console.log("Recommendations for", city, ":", recommendationString);
        } else {
            console.log("Outdated recommendations ignored for", city);
        }
    };

    return (
        <>
            <div className='bg-[rgb(255,246,234,0.3)] rounded-2xl p-[10%] mt-[10px] min-h-[50%]'>
                {weatherData.city === data ? (
                    <>
                        <div className='container-text'></div>
                        <p id='text-Container'></p>
                    </>
                ) : (
                    <p className='text-[25px]'>LOADING . . .</p>
                )}
            </div>
        </>
    );
}

export default ChatAI;
