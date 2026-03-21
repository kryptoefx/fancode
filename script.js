async function loadMatches() {
  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=https://raw.githubusercontent.com/Jitendra-unatti/fancode/refs/heads/main/data/fancode.json"
    );

    const data = await res.json();
    console.log("DATA:", data);

    // Try different possible structures
    const matches =
      data.matches ||
      data.data ||
      data.channels ||
      data;

    let html = "";

    if (!matches || matches.length === 0) {
      html = "No matches found";
    } else {
      matches.forEach(match => {
        html += `
          <div class="match">
            <div class="title">
              ${match.title || match.name || "Live Match"}
            </div>
            <div class="status">
              ${match.status || ""}
            </div>

            ${
              match.stream || match.url
                ? `<a class="watch" href="${match.stream || match.url}" target="_blank">Watch</a>`
                : ""
            }
          </div>
        `;
      });
    }

    document.getElementById("app").innerHTML = html;

  } catch (error) {
    console.error(error);
    document.getElementById("app").innerHTML =
      "❌ Failed to load data";
  }
}

loadMatches();
