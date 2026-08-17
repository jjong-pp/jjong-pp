from __future__ import annotations

import sys
from pathlib import Path

import pypdfium2 as pdfium
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parent
PDF = ROOT / "output" / "pdf" / "스퀘어스_서비스기획_PM_과제_V7_박종혁.pdf"
PREVIEW_DIR = ROOT / "output" / "qa_v7_review"


def main() -> None:
    pdf_path = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else PDF
    preview_dir = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else PREVIEW_DIR
    preview_dir.mkdir(parents=True, exist_ok=True)

    reader = PdfReader(str(pdf_path))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    required = [
        "문항 1.",
        "문항 2. PRD",
        "최우선 기능 2개와 선정 근거",
        "주요 기능 요구사항",
        "성공 측정 기준",
        "참고 자료",
    ]
    missing = [item for item in required if item not in text]

    document = pdfium.PdfDocument(str(pdf_path))
    preview_paths = []
    for index in range(len(document)):
        page = document[index]
        bitmap = page.render(scale=1.55)
        image = bitmap.to_pil()
        path = preview_dir / f"v7-{index + 1}.png"
        image.save(path)
        preview_paths.append(path)

    print(f"pages={len(reader.pages)}")
    print(f"text_chars={len(text)}")
    print(f"missing={missing}")
    for path in preview_paths:
        print(path)


if __name__ == "__main__":
    main()
