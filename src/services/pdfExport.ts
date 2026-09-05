import type { ProjectIdea } from '@/types';

export function exportToPDF(idea: ProjectIdea) {
  const win = window.open('', '_blank');
  if (!win) return;

  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + idea.title + ' - Project Synopsis</title><style>' +
    '* { margin: 0; padding: 0; box-sizing: border-box; }' +
    'body { font-family: "Times New Roman", Georgia, serif; color: #1a1a1a; line-height: 1.8; padding: 50px; max-width: 850px; margin: 0 auto; background: #fff; }' +
    '.college-header { text-align: center; border-bottom: 3px double #8b5cf6; padding-bottom: 25px; margin-bottom: 35px; }' +
    '.college-header .logo { width: 60px; height: 60px; margin: 0 auto 10px; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; }' +
    '.college-header h1 { font-size: 22px; color: #1a1a1a; margin-bottom: 5px; letter-spacing: 1px; }' +
    '.college-header .subtitle { font-size: 14px; color: #555; margin-bottom: 3px; }' +
    '.college-header .doc-type { font-size: 13px; color: #8b5cf6; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 8px; }' +
    '.title-block { text-align: center; margin-bottom: 35px; padding: 20px; background: linear-gradient(135deg, #f5f3ff, #ede9fe); border-radius: 12px; border: 1px solid #ddd6fe; }' +
    '.title-block h2 { font-size: 26px; color: #4c1d95; margin-bottom: 8px; }' +
    '.title-block .tagline { font-style: italic; color: #7c3aed; font-size: 15px; }' +
    '.title-block .meta { margin-top: 12px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }' +
    '.title-block .badge { background: #8b5cf6; color: white; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; }' +
    '.section { margin-bottom: 28px; }' +
    '.section h3 { font-size: 16px; color: #6d28d9; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #ddd6fe; }' +
    '.section p { font-size: 14px; color: #333; text-align: justify; }' +
    '.tech-table { width: 100%; border-collapse: collapse; font-size: 13px; }' +
    '.tech-table th { background: #f5f3ff; color: #6d28d9; padding: 8px 12px; text-align: left; border: 1px solid #ddd6fe; font-weight: bold; }' +
    '.tech-table td { padding: 8px 12px; border: 1px solid #e5e5e5; color: #333; }' +
    '.tech-table td:first-child { font-weight: bold; color: #6d28d9; width: 120px; background: #faf5ff; }' +
    '.features { list-style: none; padding: 0; }' +
    '.features li { font-size: 14px; margin-bottom: 8px; padding-left: 24px; position: relative; color: #333; }' +
    '.features li:before { content: "\\2714"; position: absolute; left: 0; color: #8b5cf6; font-weight: bold; }' +
    '.roadmap-item { margin-bottom: 14px; padding: 12px 16px; background: #f9fafb; border-left: 4px solid #8b5cf6; border-radius: 0 8px 8px 0; }' +
    '.roadmap-item .phase { font-weight: bold; font-size: 14px; color: #4c1d95; }' +
    '.roadmap-item .weeks { font-size: 12px; color: #888; margin-left: 8px; }' +
    '.roadmap-item .desc { font-size: 13px; color: #555; margin-top: 4px; }' +
    '.enhancements li { font-size: 14px; margin-bottom: 8px; padding-left: 24px; position: relative; color: #333; }' +
    '.enhancements li:before { content: "\\2192"; position: absolute; left: 0; color: #8b5cf6; font-weight: bold; }' +
    '.cost-box { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }' +
    '.cost-item { padding: 12px; border-radius: 10px; border: 1px solid #e5e5e5; }' +
    '.cost-item.cost { background: #f0fdf4; border-color: #bbf7d0; }' +
    '.cost-item.hardware { background: #eff6ff; border-color: #bfdbfe; }' +
    '.cost-item .label { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }' +
    '.cost-item.cost .label { color: #15803d; }' +
    '.cost-item.hardware .label { color: #1d4ed8; }' +
    '.cost-item .value { font-size: 14px; color: #333; }' +
    '.footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; border-top: 2px solid #e5e5e5; padding-top: 15px; }' +
    '.footer .brand { font-weight: bold; color: #8b5cf6; }' +
    '@media print { body { padding: 20px; } .no-print { display: none; } }' +
    '.print-btn { position: fixed; top: 20px; right: 20px; padding: 10px 20px; background: #8b5cf6; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(139,92,246,0.3); }' +
    '.print-btn:hover { background: #7c3aed; }' +
    '</style></head><body>' +

    '<button class="print-btn no-print" onclick="window.print()">Print / Save as PDF</button>' +

    '<div class="college-header">' +
      '<div class="logo">F</div>' +
      '<h1>FINAL YEAR PROJECT SYNOPSIS</h1>' +
      '<div class="subtitle">Department of Computer Science &amp; Engineering</div>' +
      '<div class="subtitle">Academic Year ' + new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '</div>' +
      '<div class="doc-type">Project Report</div>' +
    '</div>' +

    '<div class="title-block">' +
      '<h2>' + idea.title + '</h2>' +
      '<div class="tagline">"' + idea.tagline + '"</div>' +
      '<div class="meta">' +
        '<span class="badge">Innovation Score: ' + idea.innovationScore + '/10</span>' +
        '<span class="badge">Date: ' + date + '</span>' +
      '</div>' +
    '</div>' +

    '<div class="section"><h3>1. Problem Statement</h3><p>' + idea.problem + '</p></div>' +

    '<div class="section"><h3>2. Technology Stack</h3>' +
      '<table class="tech-table">' +
        '<tr><th>Layer</th><th>Technologies</th></tr>' +
        '<tr><td>Frontend</td><td>' + idea.techStack.frontend.join(', ') + '</td></tr>' +
        '<tr><td>Backend</td><td>' + idea.techStack.backend.join(', ') + '</td></tr>' +
        '<tr><td>AI / ML</td><td>' + (idea.techStack.aiml.join(', ') || 'N/A') + '</td></tr>' +
        '<tr><td>Hardware</td><td>' + (idea.techStack.hardware.join(', ') || 'N/A') + '</td></tr>' +
        '<tr><td>Database</td><td>' + idea.techStack.database.join(', ') + '</td></tr>' +
      '</table>' +
    '</div>' +

    '<div class="section"><h3>3. Core Features</h3>' +
      '<ul class="features">' + idea.coreFeatures.map(function(f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
    '</div>' +

    '<div class="section"><h3>4. Development Roadmap</h3>' +
      idea.roadmap.map(function(r) {
        return '<div class="roadmap-item"><span class="phase">' + r.phase + '</span><span class="weeks">(' + r.weeks + ')</span><div class="desc">' + r.description + '</div></div>';
      }).join('') +
    '</div>' +

    '<div class="section"><h3>5. Why This Will Impress Judges</h3><p>' + idea.whyImpress + '</p></div>' +

    '<div class="section"><h3>6. Estimated Cost &amp; Hardware</h3>' +
      '<div class="cost-box">' +
        '<div class="cost-item cost"><div class="label">Estimated Cost</div><div class="value">' + idea.estimatedCost + '</div></div>' +
        '<div class="cost-item hardware"><div class="label">Hardware Needed</div><div class="value">' + idea.hardwareNeeded + '</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="section"><h3>7. Future Enhancements</h3>' +
      '<ul class="enhancements">' + idea.futureEnhancements.map(function(f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
    '</div>' +

    '<div class="footer">' +
      '<span class="brand">FinalYear AI</span> - From Idea to Project<br/>' +
      'Generated on ' + date + '<br/>' +
      'This synopsis was AI-generated and is intended as a reference document for academic submission.' +
    '</div>' +

    '<script>window.onload = function() { setTimeout(function() { window.print(); }, 500); }</script>' +
    '</body></html>';

  win.document.write(html);
  win.document.close();
}
