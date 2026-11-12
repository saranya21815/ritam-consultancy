const fs = require('fs');
const files = [
  'check_crops.cjs', 'crop_high_res.cjs', 'crop_screenshot2.cjs', 'inspect_all_pdf_fonts.cjs',
  'inspect_number_metrics.cjs', 'verify_computed_styles.cjs', 'detailed_pdf_number_analysis.cjs',
  'phone_box_zoomed.png', 'figma_typography_panel.png', 'footer_phone_zoomed.png',
  'figma_typography_panel2.png', 'crop1_phone.png', 'crop1_typo.png', 'crop2_footer_phone.png',
  'crop2_typo.png', 'test_parser.cjs', 'dump_texts.cjs', 'dump_all_texts.cjs',
  'test_pdfparse.cjs', 'parse_pdf_text_blocks.mjs', 'inspect_all_fonts_and_numbers.mjs',
  'audit_phone_numbers.cjs', 'clean_audit.cjs'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    try { fs.unlinkSync(f); } catch(e) {}
  }
});
console.log('Cleanup completed successfully.');

