import numberSeparator from "number-separator";

export const templateEmailOrderInfo = (
  titleName: string,
  companyName: string,
  contactEmail: string,
  contactName: string,
  contactPhone: string,
  companyEmail: string,
  companyCity: string,
  discountCode: number,
  courseName: string,
  coursePrice: number,
  expectedRevenue: number,
  quantity: number,
) => {

  return `
  <div class="invoice-box" style="
      max-width: 800px;
      margin: auto;
      padding: 30px;
      padding-top: 0px;
      border: 1px solid #eee; 
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      font-size: 16px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
  ">
      <h1>${titleName}</h1>
      <table style="
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse;
      ">
          <tr class="information">
              <td colspan="2" style="padding: 5px; vertical-align: top; padding-bottom: 40px;">
                  <table style="
                  width: 100%;
                  line-height: inherit;
                  text-align: left;
                  border-collapse: collapse;
                ">
                      <tr>
                          <td>
                              Company name: ${companyName} <br /> Email company: ${companyEmail} <br /> City: ${companyCity}
                          </td>

                          <td>
                              Contact name: ${contactName} <br /> Email contact: ${contactEmail}<br /> Phone: ${contactPhone}
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>

          <tr class="heading" style=" background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;">
              <td style="padding: 5px; vertical-align: top; text-align: left;">Item</td>
              <td style="padding: 5px; vertical-align: top; text-align: center;">Quantity</td>
              <td style="padding: 5px; vertical-align: top; text-align: center; width: 14%;">Discount (%)</td>
              <td style="padding: 5px; vertical-align: top; text-align: right;">Price</td>
          </tr>

          <tr class="item" style="border-bottom: 1px solid #eee;">
              <td style="padding: 5px; vertical-align: top; text-align: left; width: 50%;">${courseName}</td>
              <td style="padding: 5px; vertical-align: top; text-align: center;">${quantity}</td>
              <td style="padding: 5px; vertical-align: top; text-align: center;">${discountCode * 100}%</td>
              <td style="padding: 5px; vertical-align: top; text-align: right;">${numberSeparator(coursePrice, '.')}vnd</td>
          </tr>

          <tr class="total" style=" border-top: 2px solid #eee;
          font-weight: bold;">
              <td style="padding: 5px; vertical-align: top;"></td>
              <td style="padding: 5px; vertical-align: top;"></td>
              <td style="padding: 5px; vertical-align: top;"></td>
              <td style="padding: 5px; vertical-align: top; text-align: right;">Total: ${numberSeparator((expectedRevenue * quantity), '.')}vnd</td>
          </tr>
      </table>
  </div>
  `
}