from pathlib import Path
from zipfile import ZipFile
import re

from docx import Document
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from lxml import etree


path = Path(r"C:\MyMain\brandpage\스퀘어스\output\docx\스퀘어스_서비스기획_PM_과제_V2_박종혁.docx")
doc = Document(path)
all_text = "\n".join(p.text for p in doc.paragraphs)
all_text += "\n" + "\n".join(
    cell.text for table in doc.tables for row in table.rows for cell in row.cells
)
links = [
    rel.target_ref
    for rel in doc.part.rels.values()
    if rel.reltype == RT.HYPERLINK and rel.is_external
]

with ZipFile(path) as archive:
    zip_ok = archive.testzip() is None
    document_xml = archive.read("word/document.xml")
    styles_xml = archive.read("word/styles.xml")

ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
document_root = etree.fromstring(document_xml)
styles_root = etree.fromstring(styles_xml)
title_style = styles_root.xpath("//w:style[@w:styleId='Title']", namespaces=ns)[0]

print("bytes", path.stat().st_size)
print("zip_ok", zip_ok)
print("sections", len(doc.sections))
print(
    "a4",
    round(doc.sections[0].page_width.mm, 1) == 210.0
    and round(doc.sections[0].page_height.mm, 1) == 297.0,
)
print("tables", len(doc.tables))
print("table_rows", [len(table.rows) for table in doc.tables])
print("table_headers", len(document_root.xpath("//w:tblHeader", namespaces=ns)))
print("cant_split", len(document_root.xpath("//w:cantSplit", namespaces=ns)))
print("numbered_paragraphs", len(document_root.xpath("//w:numPr", namespaces=ns)))
print("heading1", sum(p.style.name == "Heading 1" for p in doc.paragraphs))
print("heading2", sum(p.style.name == "Heading 2" for p in doc.paragraphs))
print("source_tags", len(re.findall(r"\[출처 [^\]]+\]", all_text)))
print("legacy_citations", len(re.findall(r"\[[1-5]\]", all_text)))
print("external_links", len(links))
print("unique_links", len(set(links)))
print("title_border", bool(title_style.xpath("./w:pPr/w:pBdr", namespaces=ns)))
print("title", doc.core_properties.title)
print("author", doc.core_properties.author)
print("urls", "|".join(sorted(set(links))))
