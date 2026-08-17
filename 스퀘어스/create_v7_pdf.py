from __future__ import annotations

import html
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "21_최종제출본_V7.md"
OUTPUT = ROOT / "output" / "pdf" / "스퀘어스_서비스기획_PM_과제_V7_박종혁.pdf"


def register_fonts() -> None:
    regular = Path(r"C:\Windows\Fonts\malgun.ttf")
    bold = Path(r"C:\Windows\Fonts\malgunbd.ttf")
    if not regular.exists() or not bold.exists():
        raise FileNotFoundError("맑은 고딕 글꼴을 찾을 수 없습니다.")
    pdfmetrics.registerFont(TTFont("Malgun", str(regular)))
    pdfmetrics.registerFont(TTFont("MalgunBold", str(bold)))


def inline_markup(text: str) -> str:
    links: list[tuple[str, str]] = []

    def save_link(match: re.Match[str]) -> str:
        token = f"@@LINK{len(links)}@@"
        links.append((match.group(1), match.group(2)))
        return token

    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", save_link, text)
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)

    for index, (label, url) in enumerate(links):
        token = html.escape(f"@@LINK{index}@@")
        link = (
            f'<a href="{html.escape(url, quote=True)}" color="#2457A6">'
            f"{html.escape(label)}</a>"
        )
        text = text.replace(token, link)
    return text


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "KTitle",
            parent=base["Title"],
            fontName="MalgunBold",
            fontSize=19,
            leading=27,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#17233C"),
            spaceAfter=9 * mm,
        ),
        "meta": ParagraphStyle(
            "KMeta",
            parent=base["Normal"],
            fontName="Malgun",
            fontSize=9.2,
            leading=14,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#526078"),
            spaceAfter=2 * mm,
        ),
        "h2": ParagraphStyle(
            "KH2",
            parent=base["Heading2"],
            fontName="MalgunBold",
            fontSize=14,
            leading=20,
            textColor=colors.HexColor("#17233C"),
            spaceBefore=5 * mm,
            spaceAfter=3 * mm,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "KH3",
            parent=base["Heading3"],
            fontName="MalgunBold",
            fontSize=11.5,
            leading=17,
            textColor=colors.HexColor("#233A65"),
            spaceBefore=4 * mm,
            spaceAfter=2 * mm,
            keepWithNext=True,
        ),
        "h4": ParagraphStyle(
            "KH4",
            parent=base["Heading4"],
            fontName="MalgunBold",
            fontSize=10.2,
            leading=15,
            textColor=colors.HexColor("#2D4F7F"),
            spaceBefore=3 * mm,
            spaceAfter=1.5 * mm,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "KBody",
            parent=base["BodyText"],
            fontName="Malgun",
            fontSize=9.2,
            leading=15.1,
            alignment=TA_LEFT,
            textColor=colors.HexColor("#202630"),
            wordWrap="CJK",
            spaceAfter=2.5 * mm,
        ),
        "bullet": ParagraphStyle(
            "KBullet",
            parent=base["BodyText"],
            fontName="Malgun",
            fontSize=8.9,
            leading=14.4,
            leftIndent=5 * mm,
            firstLineIndent=-3 * mm,
            textColor=colors.HexColor("#202630"),
            wordWrap="CJK",
            spaceAfter=1.4 * mm,
        ),
        "number": ParagraphStyle(
            "KNumber",
            parent=base["BodyText"],
            fontName="Malgun",
            fontSize=9,
            leading=14.5,
            leftIndent=6 * mm,
            firstLineIndent=-4 * mm,
            textColor=colors.HexColor("#202630"),
            wordWrap="CJK",
            spaceAfter=1.4 * mm,
        ),
        "table_header": ParagraphStyle(
            "KTableHeader",
            parent=base["BodyText"],
            fontName="MalgunBold",
            fontSize=7.5,
            leading=10.8,
            alignment=TA_CENTER,
            textColor=colors.white,
            wordWrap="CJK",
        ),
        "table_cell": ParagraphStyle(
            "KTableCell",
            parent=base["BodyText"],
            fontName="Malgun",
            fontSize=7.35,
            leading=11.2,
            textColor=colors.HexColor("#202630"),
            wordWrap="CJK",
        ),
        "reference": ParagraphStyle(
            "KReference",
            parent=base["BodyText"],
            fontName="Malgun",
            fontSize=8,
            leading=12.5,
            leftIndent=5 * mm,
            firstLineIndent=-4 * mm,
            textColor=colors.HexColor("#364154"),
            wordWrap="CJK",
            spaceAfter=1.2 * mm,
        ),
    }


def table_widths(column_count: int, available_width: float) -> list[float]:
    ratios = {
        3: [0.22, 0.37, 0.41],
        5: [0.16, 0.28, 0.13, 0.28, 0.15],
    }.get(column_count)
    if ratios is None:
        return [available_width / column_count] * column_count
    return [available_width * ratio for ratio in ratios]


def parse_table(lines: list[str], styles: dict[str, ParagraphStyle], width: float) -> Table:
    rows: list[list[str]] = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
            continue
        rows.append(cells)

    rendered: list[list[Paragraph]] = []
    for row_index, row in enumerate(rows):
        style = styles["table_header"] if row_index == 0 else styles["table_cell"]
        rendered.append([Paragraph(inline_markup(cell), style) for cell in row])

    table = Table(
        rendered,
        colWidths=table_widths(len(rendered[0]), width),
        repeatRows=1,
        hAlign="LEFT",
        splitByRow=1,
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#334E78")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#BCC6D5")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F5F7FA")]),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def build_story(markdown_text: str, styles: dict[str, ParagraphStyle], width: float):
    story = []
    lines = markdown_text.splitlines()
    index = 0
    in_references = False

    while index < len(lines):
        raw = lines[index].rstrip()
        stripped = raw.strip()

        if not stripped:
            index += 1
            continue

        if stripped.startswith("|"):
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            story.append(parse_table(table_lines, styles, width))
            story.append(Spacer(1, 3.2 * mm))
            continue

        if stripped.startswith("# "):
            story.append(Paragraph(inline_markup(stripped[2:]), styles["title"]))
        elif stripped.startswith("## "):
            heading = stripped[3:]
            if heading == "문항 2. PRD":
                story.append(PageBreak())
            in_references = heading == "참고 자료"
            story.append(Paragraph(inline_markup(heading), styles["h2"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(inline_markup(stripped[4:]), styles["h3"]))
        elif stripped.startswith("#### "):
            story.append(Paragraph(inline_markup(stripped[5:]), styles["h4"]))
        elif re.match(r"^\d+\.\s", stripped):
            style = styles["reference"] if in_references else styles["number"]
            story.append(Paragraph(inline_markup(stripped), style))
        elif stripped.startswith("- "):
            story.append(Paragraph("• " + inline_markup(stripped[2:]), styles["bullet"]))
        elif stripped.startswith("지원자:") or stripped.startswith("작성일:"):
            story.append(Paragraph(inline_markup(stripped.replace("  ", "")), styles["meta"]))
        else:
            paragraph_lines = [stripped]
            index += 1
            while index < len(lines):
                next_line = lines[index].strip()
                if (
                    not next_line
                    or next_line.startswith("#")
                    or next_line.startswith("|")
                    or next_line.startswith("- ")
                    or re.match(r"^\d+\.\s", next_line)
                ):
                    break
                paragraph_lines.append(next_line)
                index += 1
            story.append(Paragraph(inline_markup(" ".join(paragraph_lines)), styles["body"]))
            continue

        index += 1

    return story


def page_chrome(canvas, document) -> None:
    canvas.saveState()
    page_width, page_height = A4
    canvas.setStrokeColor(colors.HexColor("#D8DEE8"))
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 13 * mm, page_width - 18 * mm, 13 * mm)
    canvas.setFont("Malgun", 7.5)
    canvas.setFillColor(colors.HexColor("#6B7484"))
    canvas.drawString(18 * mm, 8.5 * mm, "스퀘어스 서비스기획 PM 과제 | 박종혁")
    canvas.drawRightString(page_width - 18 * mm, 8.5 * mm, str(document.page))
    canvas.restoreState()


def main() -> None:
    source = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else SOURCE
    output = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else OUTPUT
    output.parent.mkdir(parents=True, exist_ok=True)

    register_fonts()
    styles = make_styles()
    document = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=17 * mm,
        leftMargin=17 * mm,
        topMargin=16 * mm,
        bottomMargin=18 * mm,
        title="스퀘어스 서비스기획 PM 과제 V7",
        author="박종혁",
        subject="GEO 기준 및 B2B SaaS 브랜드 노출 진단 PRD",
    )
    markdown_text = source.read_text(encoding="utf-8")
    story = build_story(markdown_text, styles, document.width)
    document.build(story, onFirstPage=page_chrome, onLaterPages=page_chrome)
    print(output)


if __name__ == "__main__":
    main()
