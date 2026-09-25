"""Generate the downloadable brochure. Requires Pillow and ReportLab.

Run from any directory: python3 scripts/generate_system_solutions_brochure.py
Content summarizes the capabilities published on src/pages/Embedded.jsx.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/brochures/system-solutions.pdf"
NAVY, BLUE, PALE, GRAY = "#071b46", "#0066fe", "#f0f6ff", "#475569"
WIDTH, HEIGHT = A4
MARGIN = 42
CONTENT = WIDTH - 2 * MARGIN


def paragraph(pdf, text, x, top, width, size=11, color=GRAY, bold=False):
    style = ParagraphStyle(
        "brochure", fontName="Helvetica-Bold" if bold else "Helvetica",
        fontSize=size, leading=size * 1.4, textColor=HexColor(color),
    )
    block = Paragraph(text, style)
    _, height = block.wrap(width, HEIGHT)
    block.drawOn(pdf, x, top - height)
    return top - height


def base(pdf, page):
    pdf.setFillColor(HexColor(BLUE))
    pdf.rect(0, HEIGHT - 7, WIDTH, 7, fill=1, stroke=0)
    pdf.drawImage(
        ImageReader(str(ROOT / "src/assets/image/header_footer_img/header_logo.webp")),
        MARGIN, HEIGHT - 70, width=150, height=38,
        preserveAspectRatio=True, anchor="w", mask="auto",
    )
    pdf.setStrokeColor(HexColor("#dbe7f7"))
    pdf.line(MARGIN, 48, WIDTH - MARGIN, 48)
    paragraph(pdf, "VConnectTech  |  System Engineering", MARGIN, 37, CONTENT, 9)
    pdf.setFont("Helvetica", 9)
    pdf.setFillColor(HexColor(GRAY))
    pdf.drawRightString(WIDTH - MARGIN, 24, f"0{page}")


def generate():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1, invariant=1)
    pdf.setTitle("System Solutions Capability Brochure")
    pdf.setAuthor("VConnectTech")
    pdf.setSubject("Hardware, firmware, connectivity, integration and production support")
    base(pdf, 1)
    paragraph(pdf, "SYSTEM ENGINEERING", MARGIN, 733, CONTENT, 10, BLUE, True)
    paragraph(pdf, "System Solutions", MARGIN, 701, CONTENT, 36, NAVY, True)
    paragraph(pdf, "Capability Brochure", MARGIN, 647, CONTENT, 23, BLUE, True)
    paragraph(pdf, "From hardware architecture to connected, production-ready systems.",
              MARGIN, 598, CONTENT, 16, NAVY)
    pdf.drawImage(
        ImageReader(str(ROOT / "src/assets/image/Embedded/icons/emb_brochure.webp")),
        MARGIN, 286, width=CONTENT, height=242, preserveAspectRatio=True,
        anchor="c", mask="auto",
    )
    paragraph(pdf, "Engineering across the complete system", MARGIN, 267, CONTENT, 18, NAVY, True)
    paragraph(pdf, "Bring hardware, software, and connectivity together with engineering support spanning design, platform enablement, validation, and manufacturing readiness.",
              MARGIN, 232, CONTENT, 11)
    pillars = [
        ("Hardware", "Architecture, PCB design, bring-up, and validation."),
        ("Software", "Firmware, BSPs, drivers, RTOS, and Linux."),
        ("Integration", "Connectivity, system testing, and production support."),
    ]
    col = (CONTENT - 20) / 3
    for index, (title, body) in enumerate(pillars):
        x = MARGIN + index * (col + 10)
        pdf.setFillColor(HexColor(PALE))
        pdf.roundRect(x, 80, col, 88, 9, fill=1, stroke=0)
        paragraph(pdf, title, x + 12, 154, col - 24, 12, BLUE, True)
        paragraph(pdf, body, x + 12, 130, col - 24, 9)
    pdf.showPage()

    base(pdf, 2)
    paragraph(pdf, "Capabilities that work together", MARGIN, 733, CONTENT, 25, NAVY, True)
    services = [
        ("Hardware Engineering", "System architecture, component selection, schematic and PCB design, power design, and board bring-up."),
        ("Firmware Development", "C/C++ firmware, bootloaders, peripheral integration, control algorithms, and performance optimization."),
        ("Platform Enablement", "Board support packages, hardware abstraction, Linux and RTOS porting, and middleware integration."),
        ("Real-Time Systems", "Task scheduling, interrupt handling, synchronization, multithreading, and real-time performance tuning."),
        ("Linux & Device Drivers", "Yocto and Buildroot platforms, kernel configuration, peripheral drivers, secure boot, and OTA updates."),
        ("Connectivity & IoT", "Wireless and wired interfaces, gateways, device protocols, edge-to-cloud connectivity, and edge AI enablement."),
        ("Automotive Systems", "ECU development, CAN/LIN and UDS integration, diagnostics, and functional safety architecture support."),
        ("Testing & Validation", "Unit, integration, and system testing; HIL, regression automation, stress testing, and CI/CD workflows."),
        ("Production Support", "DFM/DFT reviews, test fixtures, programming jigs, manufacturing documentation, and production test planning."),
        ("System Integration", "Hardware, software, and middleware integration with debugging and system-level validation."),
    ]
    col = (CONTENT - 18) / 2
    for index, (title, body) in enumerate(services):
        x = MARGIN + (index % 2) * (col + 18)
        top = 680 - (index // 2) * 91
        paragraph(pdf, title, x, top, col, 12, BLUE, True)
        paragraph(pdf, body, x, top - 23, col, 9.5)
    paragraph(pdf, "Across industries", MARGIN, 213, CONTENT, 16, NAVY, True)
    paragraph(pdf, "Industrial IoT  /  Healthcare  /  Automotive  /  Consumer electronics  /  Aerospace  /  Edge AI", MARGIN, 184, CONTENT, 10)
    pdf.setFillColor(HexColor(NAVY))
    pdf.roundRect(MARGIN, 65, CONTENT, 72, 10, fill=1, stroke=0)
    paragraph(pdf, "Let's build your next system.", MARGIN + 18, 122, CONTENT - 36, 15, "#ffffff", True)
    paragraph(pdf, "Tell us about your project: hr@vconnectech.in", MARGIN + 18, 95, CONTENT - 36, 10, "#ffffff")
    pdf.linkURL("mailto:hr@vconnectech.in", (MARGIN + 18, 75, WIDTH - MARGIN - 18, 97))
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    generate()
