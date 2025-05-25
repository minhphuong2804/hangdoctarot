const tarotDeck = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World",
  "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
  "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
  "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
  "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
  "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
  "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
  "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
  "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
  "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
  "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
  "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
  "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

async function drawAndAnalyze() {
  const question = document.getElementById("userQuestion").value.trim();
  const drawn = [];
  const used = new Set();
  while (drawn.length < 3) {
    let i = Math.floor(Math.random() * tarotDeck.length);
    if (!used.has(i)) {
      used.add(i);
      drawn.push(tarotDeck[i]);
    }
  }

  const message = `Câu hỏi của người dùng: "${question}". Các lá bài được rút là:\n1. ${drawn[0]}\n2. ${drawn[1]}\n3. ${drawn[2]}\n\nHãy phân tích trải bài 3 lá (quá khứ, hiện tại, tương lai) và đưa ra thông điệp Tarot bằng tiếng Việt.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;

  const cardsHTML = drawn.map(card => `<div class="card"><div class="card-name">${card}</div></div>`).join("");
  document.getElementById("cards").innerHTML = cardsHTML;
  document.getElementById("result").innerText = aiResponse;
}
