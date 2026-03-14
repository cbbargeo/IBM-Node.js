const API_URL = "./travel_recommendation_api.json";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsContainer = document.getElementById("resultsContainer");
const contactForm = document.getElementById("contactForm");

let travelData = null;

const keywordGroups = {
	beaches: ["beach", "beaches", "praia", "praias"],
	temples: ["temple", "temples", "templo", "templos"],
	countries: ["country", "countries", "pais", "paises"],
};

const timezoneByKeyword = [
	{ terms: ["new york"], zone: "America/New_York" },
	{ terms: ["sydney", "melbourne", "australia"], zone: "Australia/Sydney" },
	{ terms: ["tokyo", "kyoto", "japan"], zone: "Asia/Tokyo" },
	{ terms: ["rio", "sao paulo", "copacabana", "brazil"], zone: "America/Sao_Paulo" },
	{ terms: ["angkor", "cambodia"], zone: "Asia/Phnom_Penh" },
	{ terms: ["taj mahal", "india"], zone: "Asia/Kolkata" },
	{ terms: ["bora bora", "french polynesia"], zone: "Pacific/Tahiti" },
];

async function fetchTravelData() {
	if (travelData) {
		return travelData;
	}

	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Falha ao carregar dados de recomendacoes.");
	}

	travelData = await response.json();
	return travelData;
}

function normalizeText(text) {
	return String(text || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
}

function queryHasKeyword(normalizedQuery, keywords) {
	return keywords.some((keyword) => normalizedQuery.includes(keyword));
}

function getLocalTime(timeZone) {
	if (!timeZone) {
		return "Horario local indisponivel";
	}

	const options = {
		timeZone,
		hour12: true,
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};

	return new Date().toLocaleTimeString("en-US", options);
}

function inferTimeZone(placeName) {
	const normalizedName = normalizeText(placeName);
	const match = timezoneByKeyword.find((entry) =>
		entry.terms.some((term) => normalizedName.includes(term))
	);
	return match ? match.zone : "";
}

function buildCountryResults(countries) {
	return countries.flatMap((country) =>
		(country.cities || []).map((city) => ({
			...city,
			source: country.name,
			category: "country",
		}))
	);
}

function buildAllResults(data) {
	const countries = buildCountryResults(data.countries || []);
	const beaches = (data.beaches || []).map((item) => ({ ...item, category: "beach" }));
	const temples = (data.temples || []).map((item) => ({ ...item, category: "temple" }));
	return [...countries, ...beaches, ...temples];
}

function dedupeByName(items) {
	const map = new Map();
	items.forEach((item) => {
		map.set(normalizeText(item.name), item);
	});
	return Array.from(map.values());
}

function findRecommendations(query, data) {
	const normalizedQuery = normalizeText(query);
	if (!normalizedQuery) {
		return [];
	}

	if (queryHasKeyword(normalizedQuery, keywordGroups.beaches)) {
		return data.beaches || [];
	}

	if (queryHasKeyword(normalizedQuery, keywordGroups.temples)) {
		return data.temples || [];
	}

	const countryResults = buildCountryResults(data.countries || []);
	if (queryHasKeyword(normalizedQuery, keywordGroups.countries)) {
		return countryResults;
	}

	const countriesByName = (data.countries || []).find((country) =>
		normalizeText(country.name).includes(normalizedQuery)
	);
	if (countriesByName) {
		return countriesByName.cities || [];
	}

	const terms = normalizedQuery.split(/\s+/).filter(Boolean);
	const allResults = buildAllResults(data);
	const matched = allResults.filter((item) => {
		const haystack = normalizeText(`${item.name} ${item.description} ${item.source || ""}`);
		return terms.every((term) => haystack.includes(term));
	});

	return dedupeByName(matched);
}

function createResultCard(item) {
	const card = document.createElement("article");
	card.className = "travel-card";

	const image = document.createElement("img");
	image.src = item.imageUrl;
	image.alt = item.name;
	image.loading = "lazy";

	const body = document.createElement("div");
	body.className = "card-body";

	const title = document.createElement("h3");
	title.textContent = item.name;

	const description = document.createElement("p");
	description.textContent = item.description;

	const time = document.createElement("p");
	time.className = "card-time";
	const zone = inferTimeZone(item.name);
	const timeText = getLocalTime(zone);
	time.textContent = zone ? `Hora local: ${timeText}` : timeText;

	body.appendChild(title);
	body.appendChild(description);
	body.appendChild(time);

	card.appendChild(image);
	card.appendChild(body);

	return card;
}

function renderMessage(message) {
	resultsContainer.innerHTML = "";
	resultsContainer.classList.add("show");

	const title = document.createElement("h2");
	title.className = "results-title";
	title.textContent = "Search Results";

	const text = document.createElement("p");
	text.textContent = message;

	resultsContainer.appendChild(title);
	resultsContainer.appendChild(text);
}

function renderResults(items, query) {
	resultsContainer.innerHTML = "";
	resultsContainer.classList.add("show");

	const title = document.createElement("h2");
	title.className = "results-title";
	title.textContent = `Search Results: ${query}`;
	resultsContainer.appendChild(title);

	if (!items.length) {
		const empty = document.createElement("p");
		empty.textContent = "Nenhuma recomendacao encontrada para sua busca.";
		resultsContainer.appendChild(empty);
		return;
	}

	const grid = document.createElement("div");
	grid.className = "cards-grid";
	items.forEach((item) => grid.appendChild(createResultCard(item)));
	resultsContainer.appendChild(grid);
}

function clearResults() {
	searchInput.value = "";
	resultsContainer.innerHTML = "";
	resultsContainer.classList.remove("show");
}

async function runSearch() {
	const query = searchInput.value.trim();
	if (!query) {
		renderMessage("Digite uma palavra-chave para pesquisar destinos.");
		return;
	}

	try {
		const data = await fetchTravelData();
		const results = findRecommendations(query, data);
		renderResults(results, query);
	} catch (error) {
		console.error(error);
		renderMessage("Nao foi possivel carregar os dados de viagem. Tente novamente.");
	}
}

if (searchBtn && clearBtn && searchInput && resultsContainer) {
	searchBtn.addEventListener("click", runSearch);
	clearBtn.addEventListener("click", clearResults);

	searchInput.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			runSearch();
		}
	});
}

if (contactForm) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		alert("Mensagem enviada com sucesso!");
		contactForm.reset();
	});
}
