from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "09_최종제출본_V2.md"
OUTPUT = ROOT / "output" / "pdf" / "스퀘어스_서비스기획_PM_과제_V2_박종혁.pdf"
TMP = ROOT / "tmp" / "pdfs"

FONT_REGULAR = Path(r"C:\Windows\Fonts\malgun.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")

NAVY = HexColor("#17365D")
BLUE = HexColor("#1F4E79")
TEXT = HexColor("#1F2937")
MUTED = HexColor("#6B7280")
LINK = HexColor("#0563C1")
CALLOUT_BG = HexColor("#F4F7FA")
TABLE_HEAD = HexColor("#E8EEF5")
TABLE_LINE = HexColor("#D5DCE4")
TABLE_EDGE = HexColor("#A8B3C0")

PAGE_W, PAGE_H = A4
LEFT = 19 * mm
RIGHT = 19 * mm
TOP = 18 * mm
BOTTOM = 18 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT
CONTENT_H = PAGE_H - TOP - BOTTOM


def register_fonts() -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    pdfmetrics.registerFont(TTFont("NotoSansKR", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("NotoSansKR-Bold", str(FONT_BOLD)))
    pdfmetrics.registerFontFamily(
        "NotoSansKR",
        normal="NotoSansKR",
        bold="NotoSansKR-Bold",
        italic="NotoSansKR",
        boldItalic="NotoSansKR-Bold",
    )


def clean_dashes(text: str) -> str:
    return (
        text.replace("\u2011", "-")
        .replace("\u2012", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
    )


def inline_markup(text: str) -> str:
    text = clean_dashes(text.strip())
    escaped = html.escape(text, quote=False)

    def link_repl(match: re.Match[str]) -> str:
        label = match.group(1)
        url = match.group(2).replace("&amp;", "&")
        return f'<link href="{url}" color="#0563C1"><u>{label}</u></link>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link_repl, escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", escaped)
    escaped = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", escaped)
    return escaped


BASE = getSampleStyleSheet()
STYLES = {
    "title": ParagraphStyle(
        "DocumentTitle",
        parent=BASE["Normal"],
        fontName="NotoSansKR-Bold",
        fontSize=20,
        leading=26,
        textColor=NAVY,
        spaceAfter=8,
        keepWithNext=True,
        wordWrap="CJK",
    ),
    "meta": ParagraphStyle(
        "Meta",
        parent=BASE["Normal"],
        fontName="NotoSansKR",
        fontSize=8.7,
        leading=12,
        textColor=MUTED,
        spaceAfter=10,
        wordWrap="CJK",
    ),
    "h2": ParagraphStyle(
        "Heading2Custom",
        parent=BASE["Normal"],
        fontName="NotoSansKR-Bold",
        fontSize=14,
        leading=19,
        textColor=BLUE,
        spaceBefore=10,
        spaceAfter=7,
        keepWithNext=True,
        wordWrap="CJK",
    ),
    "h3": ParagraphStyle(
        "Heading3Custom",
        parent=BASE["Normal"],
        fontName="NotoSansKR-Bold",
        fontSize=11.5,
        leading=16,
        textColor=BLUE,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
        wordWrap="CJK",
    ),
    "body": ParagraphStyle(
        "BodyCustom",
        parent=BASE["Normal"],
        fontName="NotoSansKR",
        fontSize=10,
        leading=15,
        textColor=TEXT,
        alignment=TA_LEFT,
        spaceAfter=5,
        allowWidows=0,
        allowOrphans=0,
        wordWrap="CJK",
    ),
    "list": ParagraphStyle(
        "ListCustom",
        parent=BASE["Normal"],
        fontName="NotoSansKR",
        fontSize=9.7,
        leading=14.4,
        textColor=TEXT,
        spaceAfter=1.5,
        wordWrap="CJK",
    ),
    "table": ParagraphStyle(
        "TableCell",
        parent=BASE["Normal"],
        fontName="NotoSansKR",
        fontSize=8.65,
        leading=12.25,
        textColor=TEXT,
        wordWrap="CJK",
    ),
    "table_bold": ParagraphStyle(
        "TableCellBold",
        parent=BASE["Normal"],
        fontName="NotoSansKR-Bold",
        fontSize=8.65,
        leading=12.25,
        textColor=TEXT,
        wordWrap="CJK",
    ),
    "reference": ParagraphStyle(
        "Reference",
        parent=BASE["Normal"],
        fontName="NotoSansKR",
        fontSize=8.35,
        leading=11.8,
        textColor=HexColor("#374151"),
        spaceAfter=2.5,
        wordWrap="CJK",
    ),
}
STYLES["body_keep"] = ParagraphStyle(
    "BodyKeepWithNext",
    parent=STYLES["body"],
    keepWithNext=True,
)


class LeftBarCallout(Flowable):
    def __init__(self, text: str) -> None:
        super().__init__()
        self.paragraph = Paragraph(text, ParagraphStyle(
            "CalloutText",
            parent=STYLES["body"],
            fontName="NotoSansKR-Bold",
            fontSize=10,
            leading=15,
            textColor=NAVY,
            spaceAfter=0,
            wordWrap="CJK",
        ))
        self.pad_x = 10
        self.pad_y = 8
        self.bar = 4
        self._width = 0
        self._height = 0
        self._pw = 0
        self._ph = 0

    def wrap(self, avail_width: float, avail_height: float) -> tuple[float, float]:
        self._width = avail_width
        self._pw = avail_width - self.pad_x * 2 - self.bar
        self._pw, self._ph = self.paragraph.wrap(self._pw, avail_height)
        self._height = self._ph + self.pad_y * 2
        return self._width, self._height

    def draw(self) -> None:
        canvas = self.canv
        canvas.saveState()
        canvas.setFillColor(CALLOUT_BG)
        canvas.roundRect(0, 0, self._width, self._height, 3, fill=1, stroke=0)
        canvas.setFillColor(BLUE)
        canvas.rect(0, 0, self.bar, self._height, fill=1, stroke=0)
        self.paragraph.drawOn(canvas, self.pad_x + self.bar, self.pad_y)
        canvas.restoreState()


class NoSplitTable(Table):
    """Keep each compact comparison table on one page without KeepTogether side effects."""

    def split(self, avail_width: float, avail_height: float) -> list:
        return []


class NoSplitListFlowable(ListFlowable):
    """Move a short list as a unit instead of leaving one item on another page."""

    def split(self, avail_width: float, avail_height: float) -> list:
        return []


class HeaderFooterDocTemplate(SimpleDocTemplate):
    """Draw page furniture last so explicit page breaks cannot hide it."""

    def handle_pageEnd(self) -> None:
        draw_page(self.canv, self)
        super().handle_pageEnd()


def header_label(page_no: int) -> str:
    if page_no == 2:
        return "GEO CRITERIA"
    if 3 <= page_no <= 6:
        return "PRD"
    if page_no >= 7:
        return "RISKS | REFERENCES | AI USE"
    return ""


def draw_page(canvas, doc) -> None:
    page_no = canvas.getPageNumber()
    canvas.saveState()
    canvas.setTitle("스퀘어스 서비스기획 PM 과제 V2")
    canvas.setAuthor("박종혁")
    canvas.setSubject("GEO 기준 3가지와 B2B SaaS 담당자를 위한 PRD")
    if page_no > 1:
        canvas.setFont("NotoSansKR", 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(LEFT, PAGE_H - 9.5 * mm, "SQUARES | SERVICE PLANNING PM ASSIGNMENT")
        canvas.drawRightString(PAGE_W - RIGHT, PAGE_H - 9.5 * mm, header_label(page_no))
        canvas.drawString(LEFT, 8.2 * mm, "PARK JONGHYEOK")
    canvas.setFont("NotoSansKR", 8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - RIGHT, 8.2 * mm, str(page_no))
    canvas.restoreState()


def paragraph(text: str, style: str = "body") -> Paragraph:
    return Paragraph(inline_markup(text), STYLES[style])


def table_from_rows(rows: list[list[str]]) -> Table:
    first = clean_dashes(rows[0][0].strip())
    if first == "기준":
        ratios = (0.30, 0.35, 0.35)
    elif first == "구분":
        ratios = (0.20, 0.40, 0.40)
    elif first == "단계":
        ratios = (0.15, 0.47, 0.38)
    else:
        ratios = tuple(1 / len(rows[0]) for _ in rows[0])

    data: list[list[Paragraph]] = []
    for r_idx, row in enumerate(rows):
        converted: list[Paragraph] = []
        for c_idx, cell in enumerate(row):
            style = "table_bold" if r_idx == 0 or (c_idx == 0 and r_idx > 0) else "table"
            converted.append(paragraph(cell, style))
        data.append(converted)

    table = NoSplitTable(
        data,
        colWidths=[CONTENT_W * ratio for ratio in ratios],
        repeatRows=1,
        hAlign="LEFT",
        splitByRow=1,
    )
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), TABLE_HEAD),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5.7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5.7),
        ("TOPPADDING", (0, 0), (-1, -1), 5.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5.2),
        ("LINEABOVE", (0, 0), (-1, 0), 0.75, TABLE_EDGE),
        ("LINEBELOW", (0, 0), (-1, 0), 0.75, TABLE_EDGE),
        ("LINEBELOW", (0, 1), (-1, -2), 0.25, TABLE_LINE),
        ("LINEBELOW", (0, -1), (-1, -1), 0.75, TABLE_EDGE),
    ]
    table.setStyle(TableStyle(commands))
    table.spaceAfter = 8
    return table


def is_special(line: str) -> bool:
    stripped = line.strip()
    return (
        not stripped
        or stripped.startswith("#")
        or stripped.startswith("> ")
        or stripped.startswith("| ")
        or stripped.startswith("- ")
        or re.match(r"^\d+\.\s+", stripped) is not None
    )


def add_manual_break(story: list, marker: str) -> None:
    markers = {
        "### 기준 1. 고객에게 중요한 질문에서 반복해 후보가 되는가",
        "## 2. PRD - 중요한 질문의 노출에서 이번 주 행동까지",
        "### 2-5. 기능 2 - 답변 진단·우선 행동 카드",
        "### 2-8. 성공을 어떻게 확인할 것인가",
        "### 2-10. 예상하는 위험과 대응",
    }
    if marker in markers:
        story.append(PageBreak())


def parse_markdown(text: str) -> list:
    lines = text.replace("\r\n", "\n").split("\n")
    story: list = []
    i = 0
    while i < len(lines):
        raw = lines[i].rstrip()
        line = raw.strip()
        if not line:
            i += 1
            continue

        if line.startswith("# "):
            story.append(Paragraph(inline_markup(line[2:]), STYLES["title"]))
            story.append(HRFlowable(width="100%", thickness=0.8, color=TABLE_EDGE, spaceBefore=1, spaceAfter=8))
            i += 1
            continue

        if line.startswith("지원자:"):
            parts = [line]
            if i + 1 < len(lines) and lines[i + 1].strip().startswith("작성일:"):
                parts.append(lines[i + 1].strip())
                i += 1
            meta = "  ·  ".join(part.rstrip() for part in parts)
            story.append(Paragraph(inline_markup(meta), STYLES["meta"]))
            i += 1
            continue

        if line.startswith("## "):
            add_manual_break(story, clean_dashes(line))
            story.append(Paragraph(inline_markup(line[3:]), STYLES["h2"]))
            i += 1
            continue

        if line.startswith("### "):
            add_manual_break(story, clean_dashes(line))
            story.append(Paragraph(inline_markup(line[4:]), STYLES["h3"]))
            i += 1
            continue

        if line.startswith("> "):
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith("> "):
                quote_lines.append(lines[i].strip()[2:])
                i += 1
            story.append(Spacer(1, 2))
            story.append(LeftBarCallout(inline_markup(" ".join(quote_lines))))
            story.append(Spacer(1, 7))
            continue

        if line.startswith("| "):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            rows = []
            for idx, table_line in enumerate(table_lines):
                cells = [cell.strip() for cell in table_line.strip("|").split("|")]
                if idx == 1 and all(re.fullmatch(r":?-+:?", cell.replace(" ", "")) for cell in cells):
                    continue
                rows.append(cells)
            add_manual_break(story, f"TABLE:{clean_dashes(rows[0][0])}")
            story.append(table_from_rows(rows))
            continue

        if line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                item_text = lines[i].strip()[2:]
                items.append(ListItem(paragraph(item_text, "list"), leftIndent=12, bulletColor=BLUE))
                i += 1
            list_flowable = NoSplitListFlowable(
                items,
                bulletType="bullet",
                start="circle",
                leftIndent=14,
                bulletFontName="NotoSansKR",
                bulletFontSize=6,
                bulletColor=BLUE,
                spaceAfter=5,
            )
            if story and isinstance(story[-1], Paragraph) and story[-1].style is STYLES["body_keep"]:
                introduction = story.pop()
                story.append(KeepTogether([introduction, list_flowable]))
            else:
                story.append(list_flowable)
            continue

        if re.match(r"^\d+\.\s+", line):
            items = []
            start_num = int(re.match(r"^(\d+)\.", line).group(1))
            style_name = "reference" if story and any(
                isinstance(x, Paragraph) and getattr(x, "style", None) == STYLES["h2"] and "참고문헌" in x.getPlainText()
                for x in story[-3:]
            ) else "list"
            while i < len(lines) and re.match(r"^\d+\.\s+", lines[i].strip()):
                item_text = re.sub(r"^\d+\.\s+", "", lines[i].strip())
                items.append(ListItem(paragraph(item_text, style_name), leftIndent=15))
                i += 1
            story.append(ListFlowable(
                items,
                bulletType="1",
                start=start_num,
                leftIndent=16,
                bulletFontName="NotoSansKR",
                bulletFontSize=8.3 if style_name == "reference" else 9.3,
                bulletColor=TEXT,
                spaceAfter=5,
            ))
            continue

        block = [line]
        i += 1
        while i < len(lines) and not is_special(lines[i]):
            block.append(lines[i].strip())
            i += 1
        joined = " ".join(block)
        list_introductions = {
            "초기 범위에서는 다음을 제외합니다.",
            "기능 1의 요구사항은 다음과 같습니다.",
            "기능 2의 요구사항은 다음과 같습니다.",
        }
        story.append(paragraph(joined, "body_keep" if joined in list_introductions else "body"))

    return story


def main() -> None:
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    source_text = SOURCE.read_text(encoding="utf-8")
    story = parse_markdown(source_text)
    doc = HeaderFooterDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=TOP,
        bottomMargin=BOTTOM,
        title="스퀘어스 서비스기획 PM 과제 V2",
        author="박종혁",
    )
    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    main()
