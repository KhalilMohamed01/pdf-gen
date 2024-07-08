import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import JsBarcode from 'jsbarcode';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  standalone:true
})
export class PdfComponent implements OnInit {
  ngOnInit(): void {}

  public async export(): Promise<void> {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, '999906268516999006770160000004', {
      format: 'CODE128',
      displayValue: true,
    });
    const barcodeDataUrl = canvas.toDataURL('image/png');

    const docDefinition = {
      content: [
        { text: 'EUROTRANSPHARMA XX', style: 'header' },

        { text: 'Exp: TEST SKANDI', style: 'small' },
        { text: 'QDFG', style: 'small' },
        { text: '63800 COURNON D AUVERGNE', style: 'small', margin: [0, 0, 0, 10] },

        { text: 'PHARMA PILOT MOUSSY', style: 'small' },
        { text: 'PHARMA PILOT MOUSSY', style: 'small' },
        { text: 'RUE DU PETIT MARTEAU', style: 'small' },
        { text: '77230 MOUSSY LE NEUF', style: 'small', margin: [0, 0, 0, 10] },

        {
          columns: [
            { text: 'REF/LAB: RRF', style: 'small' },
            { text: 'REF/CLI:', style: 'small', alignment: 'right' }
          ]
        },
        { text: 'Cde : 6 268 516', style: 'small', margin: [0, 0, 0, 10] },

        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }] },

        {
          table: {
            widths: [ '*', '*', '*' ],
            body: [
              [
                { text: 'PALETTE', bold: true, fontSize: 10 },
                { text: 'UM / UM TOTAL', fontSize: 10, alignment: 'center' },
                { text: '6 / 11', fontSize: 10, alignment: 'right' }
              ]
            ]
          },
          layout: {
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => '#000000',
            vLineColor: () => '#000000',
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
          margin: [0, 5, 0, 10]
        },

        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }] },

        {
          columns: [
            { text: 'EXPRESS', bold: true, fontSize: 10 },
            { text: '15/25°C', fontSize: 12, alignment: 'right' }
          ]
        },
        { text: '10 colis dans l\'expédition', style: 'small', margin: [0, 0, 0, 10] },

        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }] },

        { text: 'MOU 15 25', bold: true, fontSize: 14, margin: [0, 0, 0, 2] },
        { text: 'FR 77230', bold: true, fontSize: 14, margin: [0, 0, 0, 10] },

        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }] },

        {
          image: barcodeDataUrl,
          width: 400,
          height: 50,
          margin: [0, 0, 0, 5]
        }
      ],

      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        small: {
          fontSize: 10
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('test.pdf');
  }
}
