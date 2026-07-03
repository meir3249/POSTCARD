document.addEventListener('DOMContentLoaded', () => {
    const postcard = document.getElementById('postcard');
    const audio = document.getElementById('flipAudio');
    const typingContainer = document.getElementById('typing-text');
    
    let hasFlipped = false;

    const messageText = `מאמי שלי קטנה,
רציתי שתיקחי הפסקה, 
שתסתכלי דקותיים על כל מה שעברת,
שתראי כמה את התקדמת.

אני רואה כמה את משקיעה לפסיכומטרי - וזה מרגש, 
גם אני לומד ויודע כמה החרא הזה קשה, 
גם אני בדיוק כמוך, חווה תסכול, ותחושה של אי-יכולת, 
אבל אני רוצה שתדעי שאני רואה את ההתמדה שלך, 
אני רואה את הדרך שאת עוברת, 
ואני פשוט גאה בך. 

באמת, בטוח שתצליחי, כי את לא יודעת אחרת.

שלך לתמיד,
מאיר❤️`;

    postcard.addEventListener('click', () => {
        if (hasFlipped) return; // מאפשר לחיצה אחת בלבד
        hasFlipped = true;

        // ניגון הסאונד
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play prevented by browser:", e));
        }

        // סיבוב הגלויה
        postcard.classList.add('flipped');

        // המתנה לסיום האנימציה (כ-900ms) לפני תחילת הכתיבה
        setTimeout(() => {
            typeWriterHumanFeel(messageText, 0);
        }, 1000);
    });

    function typeWriterHumanFeel(text, i) {
        if (i >= text.length) {
            typingContainer.classList.add('finished');
            return;
        }

        let char = text.charAt(i);
        
        // המרת ירידות שורה לתגיות BR
        if (char === '\n') {
            typingContainer.innerHTML += '<br>';
        } else {
            typingContainer.innerHTML += char;
        }

        // חישוב זמן השהייה משתנה (Humanized Delay)
        let delay = Math.random() * 50 + 40;

        // השהייה ארוכה אחרי פסיק או נקודה
        if (char === '.' || char === ',') {
            delay += 400 + Math.random() * 300;
        }
        // עצירות רנדומליות קצרות מדי פעם
        else if (char === ' ' && Math.random() > 0.8) {
            delay += 250;
        }
        // השהייה ארוכה בירידת שורה
        else if (char === '\n') {
            delay += 600;
        }

        setTimeout(() => {
            typeWriterHumanFeel(text, i + 1);
        }, delay);
    }
});