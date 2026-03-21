async function loadMatches() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/Jitendra-unatti/fancode/refs/heads/main/data/fancode.json"
    );

    const data = await res.json();

    let html = "";

    // Adjust depending on JSON structure
    data.forEach(match => {
      html += `
        <div class="match">
          <div class="title">${match.title || "Live Match"}</div>
          <div class="status">${match.status || ""}</div>

          ${
            match.stream || match.link
              ? `<a class="watch" href="${match.stream || match.link}" target="_blank">Watch</a>`
              : ""
          }
        </div>
      `;
    });

    document.getElementById("app").innerHTML = html;

  } catch (error) {
    document.getElementById("app").innerHTML =
      "Failed to load data";
    console.error(error);
  }
}

loadMatches();
