from __future__ import annotations

import re
from pathlib import Path

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.shared import Mm, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "09_최종제출본_V2.md"
OUTPUT = ROOT / "output" / "docx" / "스퀘어스_서비스기획_PM_과제_V2_박종혁.docx"

FONT = "Malgun Gothic"
BLACK = "000000"
BODY = "222222"
MUTED = "595959"
REFERENCE = "333333"
LINK = "0563C1"
TABLE_HEADER = "EFEFEF"
TABLE_BORDER = "C8C8C8"
CALLOUT_FILL = "F3F3F3"
CALLOUT_BORDER = "7F7F7F"

CONTENT_DXA = 9750
TABLE_DXA = 9630
TABLE_INDENT_DXA = 120


def set_run_font(run, size: float | None = None, *, bold=None, italic=None,
                 color: str | None = None, underline=None) -> None:
    run.font.name = FONT
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
        rfonts.set(qn(f"w:{attr}"), FONT)
    lang = rpr.find(qn("w:lang"))
    if lang is None:
        lang = OxmlElement("w:lang")
        rpr.append(lang)
    lang.set(qn("w:val"), "ko-KR")
    lang.set(qn("w:eastAsia"), "ko-KR")
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic
    if color is not None:
        run.font.color.rgb = RGBColor.from_string(color)
    if underline is not None:
        run.underline = underline


def set_style_font(style, size: float, color: str, *, bold=False, italic=False) -> None:
    style.font.name = FONT
    style.font.size = Pt(size)
    style.font.bold = bold
    style.font.italic = italic
    style.font.color.rgb = RGBColor.from_string(color)
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
        rfonts.set(qn(f"w:{attr}"), FONT)
    lang = rpr.find(qn("w:lang"))
    if lang is None:
        lang = OxmlElement("w:lang")
        rpr.append(lang)
    lang.set(qn("w:val"), "ko-KR")
    lang.set(qn("w:eastAsia"), "ko-KR")


def set_exact_spacing(paragraph_format, points: float) -> None:
    paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
    paragraph_format.line_spacing = Pt(points)


def set_outline_level(style, level: int) -> None:
    ppr = style.element.get_or_add_pPr()
    outline = ppr.find(qn("w:outlineLvl"))
    if outline is None:
        outline = OxmlElement("w:outlineLvl")
        ppr.append(outline)
    outline.set(qn("w:val"), str(level))


def configure_styles(doc: Document) -> None:
    normal = doc.styles["Normal"]
    set_style_font(normal, 10.2, BODY)
    normal.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(5)
    set_exact_spacing(normal.paragraph_format, 15.8)
    normal.paragraph_format.widow_control = True

    title = doc.styles["Title"]
    set_style_font(title, 21.5, BLACK, bold=True)
    title.paragraph_format.space_before = Pt(0)
    title.paragraph_format.space_after = Pt(12)
    title.paragraph_format.keep_with_next = True
    title.paragraph_format.keep_together = True
    set_exact_spacing(title.paragraph_format, 27)
    title_ppr = title.element.get_or_add_pPr()
    title_border = title_ppr.find(qn("w:pBdr"))
    if title_border is not None:
        title_ppr.remove(title_border)

    subtitle = doc.styles["Subtitle"]
    set_style_font(subtitle, 9.2, MUTED)
    subtitle.paragraph_format.space_before = Pt(0)
    subtitle.paragraph_format.space_after = Pt(14)
    subtitle.paragraph_format.keep_with_next = True
    set_exact_spacing(subtitle.paragraph_format, 12)

    h1 = doc.styles["Heading 1"]
    set_style_font(h1, 16, BLACK, bold=True)
    h1.paragraph_format.space_before = Pt(22)
    h1.paragraph_format.space_after = Pt(9)
    h1.paragraph_format.keep_with_next = True
    h1.paragraph_format.keep_together = True
    set_exact_spacing(h1.paragraph_format, 21)
    set_outline_level(h1, 0)

    h2 = doc.styles["Heading 2"]
    set_style_font(h2, 12.5, BLACK, bold=True)
    h2.paragraph_format.space_before = Pt(17)
    h2.paragraph_format.space_after = Pt(6)
    h2.paragraph_format.keep_with_next = True
    h2.paragraph_format.keep_together = True
    set_exact_spacing(h2.paragraph_format, 17)
    set_outline_level(h2, 1)

    h3 = doc.styles["Heading 3"]
    set_style_font(h3, 11, BLACK, bold=True)
    h3.paragraph_format.space_before = Pt(13)
    h3.paragraph_format.space_after = Pt(5)
    h3.paragraph_format.keep_with_next = True
    h3.paragraph_format.keep_together = True
    set_exact_spacing(h3.paragraph_format, 15)
    set_outline_level(h3, 2)

    list_style = doc.styles["List Paragraph"]
    set_style_font(list_style, 10.2, BODY)
    list_style.paragraph_format.space_before = Pt(0)
    list_style.paragraph_format.space_after = Pt(3)
    set_exact_spacing(list_style.paragraph_format, 15.3)
    list_style.paragraph_format.widow_control = True

    source_tag = doc.styles.add_style("Source Tag", WD_STYLE_TYPE.PARAGRAPH)
    set_style_font(source_tag, 8.5, MUTED)
    source_tag.paragraph_format.space_before = Pt(0)
    source_tag.paragraph_format.space_after = Pt(7)
    source_tag.paragraph_format.keep_with_next = True
    source_tag.paragraph_format.keep_together = True
    set_exact_spacing(source_tag.paragraph_format, 11.5)

    reference_intro = doc.styles.add_style("Reference Intro", WD_STYLE_TYPE.PARAGRAPH)
    set_style_font(reference_intro, 9.2, MUTED)
    reference_intro.paragraph_format.space_before = Pt(0)
    reference_intro.paragraph_format.space_after = Pt(8)
    reference_intro.paragraph_format.keep_with_next = True
    set_exact_spacing(reference_intro.paragraph_format, 13)

    reference_style = doc.styles.add_style("Reference Entry", WD_STYLE_TYPE.PARAGRAPH)
    set_style_font(reference_style, 8.8, REFERENCE)
    reference_style.paragraph_format.space_before = Pt(0)
    reference_style.paragraph_format.space_after = Pt(6)
    reference_style.paragraph_format.keep_together = True
    reference_style.paragraph_format.widow_control = True
    set_exact_spacing(reference_style.paragraph_format, 12.5)

    callout = doc.styles.add_style("Problem Callout", WD_STYLE_TYPE.PARAGRAPH)
    set_style_font(callout, 10.2, BLACK)
    callout.paragraph_format.left_indent = Mm(5)
    callout.paragraph_format.right_indent = Mm(2)
    callout.paragraph_format.space_before = Pt(8)
    callout.paragraph_format.space_after = Pt(9)
    callout.paragraph_format.keep_together = True
    set_exact_spacing(callout.paragraph_format, 15.8)


def add_page_field(paragraph) -> None:
    run = paragraph.add_run()
    set_run_font(run, 8, color=MUTED)
    fld_begin = OxmlElement("w:fldChar")
    fld_begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld_separate = OxmlElement("w:fldChar")
    fld_separate.set(qn("w:fldCharType"), "separate")
    text = OxmlElement("w:t")
    text.text = "1"
    fld_end = OxmlElement("w:fldChar")
    fld_end.set(qn("w:fldCharType"), "end")
    run._r.extend([fld_begin, instr, fld_separate, text, fld_end])


def configure_page(doc: Document) -> None:
    section = doc.sections[0]
    section.page_width = Mm(210)
    section.page_height = Mm(297)
    section.top_margin = Mm(18)
    section.bottom_margin = Mm(18)
    section.left_margin = Mm(19)
    section.right_margin = Mm(19)
    section.header_distance = Mm(8)
    section.footer_distance = Mm(9)
    section.different_first_page_header_footer = True

    header = section.header
    p = header.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("스퀘어스 서비스기획 PM 과제 · 박종혁")
    set_run_font(run, 8, color=MUTED)

    first_header = section.first_page_header
    first_header.paragraphs[0].text = ""

    for footer in (section.footer, section.first_page_footer):
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        fp.paragraph_format.space_after = Pt(0)
        add_page_field(fp)


def set_update_fields(doc: Document) -> None:
    settings = doc.settings._element
    update = settings.find(qn("w:updateFields"))
    if update is None:
        update = OxmlElement("w:updateFields")
        settings.append(update)
    update.set(qn("w:val"), "true")


def add_hyperlink(paragraph, label: str, url: str) -> None:
    rel_id = paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), rel_id)

    def append_link_text(text: str, *, italic=False) -> None:
        if not text:
            return
        wrun = OxmlElement("w:r")
        rpr = OxmlElement("w:rPr")
        rfonts = OxmlElement("w:rFonts")
        for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
            rfonts.set(qn(f"w:{attr}"), FONT)
        rpr.append(rfonts)
        color = OxmlElement("w:color")
        color.set(qn("w:val"), LINK)
        rpr.append(color)
        underline = OxmlElement("w:u")
        underline.set(qn("w:val"), "single")
        rpr.append(underline)
        if italic:
            rpr.append(OxmlElement("w:i"))
            rpr.append(OxmlElement("w:iCs"))
        wrun.append(rpr)
        wt = OxmlElement("w:t")
        wt.text = text
        wrun.append(wt)
        hyperlink.append(wrun)

    parts = re.split(r"(\*[^*]+\*)", label)
    for part in parts:
        if part.startswith("*") and part.endswith("*"):
            append_link_text(part[1:-1], italic=True)
        else:
            append_link_text(part)
    paragraph._p.append(hyperlink)


INLINE_TOKEN = re.compile(
    r"(\[출처 [^\]]+\]|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)"
)


def add_inline(paragraph, text: str, *, size: float | None = None,
               color: str | None = None) -> None:
    pos = 0
    for match in INLINE_TOKEN.finditer(text):
        if match.start() > pos:
            run = paragraph.add_run(text[pos:match.start()])
            set_run_font(run, size, color=color)
        token = match.group(0)
        link_match = re.fullmatch(r"\[([^\]]+)\]\(([^)]+)\)", token)
        if token.startswith("[출처 "):
            run = paragraph.add_run(token)
            set_run_font(run, 8.5, color=MUTED)
        elif link_match:
            add_hyperlink(paragraph, link_match.group(1), link_match.group(2))
        elif token.startswith("**"):
            run = paragraph.add_run(token[2:-2])
            set_run_font(run, size, bold=True, color=color)
        else:
            run = paragraph.add_run(token[1:-1])
            set_run_font(run, size, italic=True, color=color)
        pos = match.end()
    if pos < len(text):
        run = paragraph.add_run(text[pos:])
        set_run_font(run, size, color=color)


def add_paragraph(doc: Document, text: str, style: str = "Normal", *,
                  keep_with_next=False, page_break_before=False):
    p = doc.add_paragraph(style=style)
    add_inline(p, text)
    p.paragraph_format.keep_with_next = keep_with_next
    p.paragraph_format.page_break_before = page_break_before
    p.paragraph_format.widow_control = True
    return p


def shade_and_border_callout(paragraph) -> None:
    ppr = paragraph._p.get_or_add_pPr()
    shd = ppr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        ppr.append(shd)
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), CALLOUT_FILL)
    pbdr = ppr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        ppr.append(pbdr)
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single")
    left.set(qn("w:sz"), "12")
    left.set(qn("w:space"), "8")
    left.set(qn("w:color"), CALLOUT_BORDER)
    pbdr.append(left)


def _next_id(elements, attr: str) -> int:
    values = [int(el.get(qn(attr))) for el in elements if el.get(qn(attr)) is not None]
    return max(values, default=0) + 1


def create_numbering(doc: Document, kind: str) -> int:
    numbering = doc.part.numbering_part.element
    abstract_id = _next_id(numbering.findall(qn("w:abstractNum")), "w:abstractNumId")
    num_id = _next_id(numbering.findall(qn("w:num")), "w:numId")

    abstract = OxmlElement("w:abstractNum")
    abstract.set(qn("w:abstractNumId"), str(abstract_id))
    multi = OxmlElement("w:multiLevelType")
    multi.set(qn("w:val"), "singleLevel")
    abstract.append(multi)
    lvl = OxmlElement("w:lvl")
    lvl.set(qn("w:ilvl"), "0")
    start = OxmlElement("w:start")
    start.set(qn("w:val"), "1")
    lvl.append(start)
    num_fmt = OxmlElement("w:numFmt")
    num_fmt.set(qn("w:val"), "bullet" if kind == "bullet" else "decimal")
    lvl.append(num_fmt)
    lvl_text = OxmlElement("w:lvlText")
    lvl_text.set(qn("w:val"), "•" if kind == "bullet" else "%1.")
    lvl.append(lvl_text)
    suff = OxmlElement("w:suff")
    suff.set(qn("w:val"), "tab")
    lvl.append(suff)
    jc = OxmlElement("w:lvlJc")
    jc.set(qn("w:val"), "left")
    lvl.append(jc)
    ppr = OxmlElement("w:pPr")
    tabs = OxmlElement("w:tabs")
    tab = OxmlElement("w:tab")
    tab.set(qn("w:val"), "num")
    tab.set(qn("w:pos"), "720")
    tabs.append(tab)
    ppr.append(tabs)
    ind = OxmlElement("w:ind")
    ind.set(qn("w:left"), "720")
    ind.set(qn("w:hanging"), "360")
    ppr.append(ind)
    lvl.append(ppr)
    rpr = OxmlElement("w:rPr")
    rfonts = OxmlElement("w:rFonts")
    for attr in ("ascii", "hAnsi", "eastAsia", "cs"):
        rfonts.set(qn(f"w:{attr}"), FONT)
    rpr.append(rfonts)
    lvl.append(rpr)
    abstract.append(lvl)
    numbering.append(abstract)

    num = OxmlElement("w:num")
    num.set(qn("w:numId"), str(num_id))
    abstract_ref = OxmlElement("w:abstractNumId")
    abstract_ref.set(qn("w:val"), str(abstract_id))
    num.append(abstract_ref)
    numbering.append(num)
    return num_id


def apply_numbering(paragraph, num_id: int) -> None:
    ppr = paragraph._p.get_or_add_pPr()
    numpr = ppr.find(qn("w:numPr"))
    if numpr is None:
        numpr = OxmlElement("w:numPr")
        ppr.insert(0, numpr)
    ilvl = OxmlElement("w:ilvl")
    ilvl.set(qn("w:val"), "0")
    numid = OxmlElement("w:numId")
    numid.set(qn("w:val"), str(num_id))
    numpr.extend([ilvl, numid])


def set_cell_margins(table) -> None:
    tbl_pr = table._tbl.tblPr
    margins = tbl_pr.find(qn("w:tblCellMar"))
    if margins is None:
        margins = OxmlElement("w:tblCellMar")
        tbl_pr.append(margins)
    for side, value in (("top", 100), ("left", 120), ("bottom", 100), ("right", 120)):
        node = margins.find(qn(f"w:{side}"))
        if node is None:
            node = OxmlElement(f"w:{side}")
            margins.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_table_geometry(table, widths: list[int]) -> None:
    table.autofit = False
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    tbl_pr = table._tbl.tblPr
    for tag in ("w:tblW", "w:tblInd", "w:tblLayout", "w:tblBorders"):
        old = tbl_pr.find(qn(tag))
        if old is not None:
            tbl_pr.remove(old)

    tbl_w = OxmlElement("w:tblW")
    tbl_w.set(qn("w:w"), str(sum(widths)))
    tbl_w.set(qn("w:type"), "dxa")
    tbl_pr.append(tbl_w)
    tbl_ind = OxmlElement("w:tblInd")
    tbl_ind.set(qn("w:w"), str(TABLE_INDENT_DXA))
    tbl_ind.set(qn("w:type"), "dxa")
    tbl_pr.append(tbl_ind)
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    tbl_pr.append(layout)

    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        node = OxmlElement(f"w:{edge}")
        node.set(qn("w:val"), "single")
        node.set(qn("w:sz"), "4")
        node.set(qn("w:space"), "0")
        node.set(qn("w:color"), TABLE_BORDER)
        borders.append(node)
    tbl_pr.append(borders)
    set_cell_margins(table)

    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in widths:
        grid_col = OxmlElement("w:gridCol")
        grid_col.set(qn("w:w"), str(width))
        grid.append(grid_col)

    for row in table.rows:
        trpr = row._tr.get_or_add_trPr()
        cant_split = OxmlElement("w:cantSplit")
        trpr.append(cant_split)
        for idx, cell in enumerate(row.cells):
            tcpr = cell._tc.get_or_add_tcPr()
            tcw = tcpr.find(qn("w:tcW"))
            if tcw is None:
                tcw = OxmlElement("w:tcW")
                tcpr.append(tcw)
            tcw.set(qn("w:w"), str(widths[idx]))
            tcw.set(qn("w:type"), "dxa")
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

    header_pr = table.rows[0]._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tbl_header.set(qn("w:val"), "true")
    header_pr.append(tbl_header)


def shade_cell(cell, fill: str) -> None:
    tcpr = cell._tc.get_or_add_tcPr()
    shd = tcpr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tcpr.append(shd)
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), fill)


def table_widths(header: str) -> list[int]:
    if header == "기준":
        return [3300, 3700, 2630]
    if header == "구분":
        return [1700, 3965, 3965]
    if header == "단계":
        return [1550, 4300, 3780]
    width = TABLE_DXA // 3
    return [width, width, TABLE_DXA - width * 2]


def add_table(doc: Document, rows: list[list[str]]) -> None:
    table = doc.add_table(rows=len(rows), cols=len(rows[0]))
    widths = table_widths(rows[0][0])
    set_table_geometry(table, widths)
    for r_idx, row in enumerate(rows):
        for c_idx, text in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.keep_together = True
            set_exact_spacing(p.paragraph_format, 13)
            add_inline(p, text, size=9, color=BODY)
            for run in p.runs:
                set_run_font(run, 9, bold=(r_idx == 0 or (c_idx == 0 and r_idx > 0)), color=BODY)
            if r_idx == 0:
                shade_cell(cell, TABLE_HEADER)
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_before = Pt(0)
    spacer.paragraph_format.space_after = Pt(2)
    spacer.paragraph_format.line_spacing = Pt(2)


def is_table_separator(cells: list[str]) -> bool:
    return all(re.fullmatch(r":?-+:?", cell.replace(" ", "")) for cell in cells)


def next_nonblank(lines: list[str], start: int) -> str:
    for j in range(start, len(lines)):
        if lines[j].strip():
            return lines[j].strip()
    return ""


PAGE_BREAK_HEADINGS = {
    "기준 1. 고객에게 중요한 질문에서 반복해 후보가 되는가",
    "2. PRD — AI 답변 노출 진단과 우선 행동 제안",
    "2-3. 제품 범위와 두 기능",
    "2-5. 기능 2 — 답변 진단·우선 행동 카드",
    "2-8. 성공을 어떻게 확인할 것인가",
}


def parse_markdown(doc: Document, text: str) -> None:
    lines = text.replace("\r\n", "\n").split("\n")
    in_references = False
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        if line.startswith("# "):
            add_paragraph(doc, line[2:], "Title")
            i += 1
            continue

        if line.startswith("지원자:"):
            date_text = ""
            if i + 1 < len(lines) and lines[i + 1].strip().startswith("작성일:"):
                date_text = lines[i + 1].strip().replace("작성일:", "").strip()
                i += 1
            applicant = line.replace("지원자:", "").rstrip().strip()
            add_paragraph(doc, f"지원자 {applicant}  |  작성일 {date_text}", "Subtitle")
            i += 1
            continue

        if line.startswith("## "):
            heading = line[3:]
            in_references = heading == "출처와 해석 범위"
            p = add_paragraph(
                doc,
                heading,
                "Heading 1",
                page_break_before=heading in PAGE_BREAK_HEADINGS,
            )
            if heading == "생성형 AI 활용 범위":
                in_references = False
            i += 1
            continue

        if line.startswith("### "):
            heading = line[4:]
            add_paragraph(
                doc,
                heading,
                "Heading 2",
                page_break_before=heading in PAGE_BREAK_HEADINGS,
            )
            i += 1
            continue

        if line.startswith("> "):
            content = line[2:]
            p = add_paragraph(doc, content, "Problem Callout")
            shade_and_border_callout(p)
            i += 1
            continue

        if line.startswith("| "):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            rows = []
            for table_line in table_lines:
                cells = [cell.strip() for cell in table_line.strip("|").split("|")]
                if not is_table_separator(cells):
                    rows.append(cells)
            add_table(doc, rows)
            continue

        if line.startswith("- "):
            num_id = create_numbering(doc, "bullet")
            while i < len(lines) and lines[i].strip().startswith("- "):
                item = lines[i].strip()[2:]
                p = doc.add_paragraph(style="List Paragraph")
                add_inline(p, item)
                apply_numbering(p, num_id)
                p.paragraph_format.keep_together = True
                i += 1
            continue

        if re.match(r"^\d+\.\s+", line):
            num_id = create_numbering(doc, "decimal")
            while i < len(lines) and re.match(r"^\d+\.\s+", lines[i].strip()):
                item = re.sub(r"^\d+\.\s+", "", lines[i].strip())
                p = doc.add_paragraph(style="List Paragraph")
                add_inline(p, item)
                apply_numbering(p, num_id)
                p.paragraph_format.keep_together = True
                i += 1
            continue

        if line.startswith("[출처 "):
            p = doc.add_paragraph(style="Source Tag")
            add_inline(p, line, size=8.5, color=MUTED)
            i += 1
            continue

        following = next_nonblank(lines, i + 1)
        keep_next = following.startswith(("[출처 ", "- ")) or bool(re.match(r"^\d+\.\s+", following))
        if in_references:
            style = "Reference Entry" if line.startswith("**출처 ") else "Reference Intro"
            if style == "Reference Entry":
                line = line.replace(" **본문 사용:**", "\n**본문 사용:**")
                line = line.replace(" **자료의 한계:**", "\n**자료의 한계:**")
            else:
                keep_next = True
        else:
            style = "Normal"
        add_paragraph(doc, line, style, keep_with_next=keep_next)
        i += 1


def build() -> None:
    doc = Document()
    configure_page(doc)
    configure_styles(doc)
    set_update_fields(doc)
    props = doc.core_properties
    props.title = "스퀘어스 서비스기획 PM 과제 V2"
    props.author = "박종혁"
    props.subject = "좋은 GEO의 기준 3가지와 B2B SaaS 담당자를 위한 PRD"
    props.keywords = "GEO, PRD, B2B SaaS, 스퀘어스, 큐샵"
    parse_markdown(doc, SOURCE.read_text(encoding="utf-8"))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build()
