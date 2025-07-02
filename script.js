const codonTable = {
  UUU: "F", UUC: "F", UUA: "L", UUG: "L",
  CUU: "L", CUC: "L", CUA: "L", CUG: "L",
  AUU: "I", AUC: "I", AUA: "I", AUG: "M",
  GUU: "V", GUC: "V", GUA: "V", GUG: "V",
  UCU: "S", UCC: "S", UCA: "S", UCG: "S",
  CCU: "P", CCC: "P", CCA: "P", CCG: "P",
  ACU: "T", ACC: "T", ACA: "T", ACG: "T",
  GCU: "A", GCC: "A", GCA: "A", GCG: "A",
  UAU: "Y", UAC: "Y", UAA: "*", UAG: "*",
  CAU: "H", CAC: "H", CAA: "Q", CAG: "Q",
  AAU: "N", AAC: "N", AAA: "K", AAG: "K",
  GAU: "D", GAC: "D", GAA: "E", GAG: "E",
  UGU: "C", UGC: "C", UGA: "*", UGG: "W",
  CGU: "R", CGC: "R", CGA: "R", CGG: "R",
  AGU: "S", AGC: "S", AGA: "R", AGG: "R",
  GGU: "G", GGC: "G", GGA: "G", GGG: "G"
};

function processDNA() {
  const dnaInput = document.getElementById("dnaInput").value.toUpperCase().replace(/[^ATGC]/g, "");
  const rna = dnaInput.replace(/T/g, "U");
  document.getElementById("rnaOutput").textContent = rna;

  let protein = "";
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    if (codon.length === 3) {
      protein += codonTable[codon] || "?";
    }
  }
  document.getElementById("proteinOutput").textContent = protein;
}

function uploadFasta() {
  const fileInput = document.getElementById("fastaFile");
  if (!fileInput.files.length) {
    alert("Please select a FASTA file first!");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    // Filter out lines starting with '>', join the rest, uppercase, remove non-DNA chars
    const lines = text.split(/\r?\n/);
    const sequence = lines
      .filter(line => !line.startsWith(">"))
      .join("")
      .toUpperCase()
      .replace(/[^ATGC]/g, "");

    if (!sequence) {
      alert("No valid DNA sequence found in FASTA file.");
      return;
    }

    document.getElementById("dnaInput").value = sequence;
    processDNA();
  };

  reader.readAsText(file);
}

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
