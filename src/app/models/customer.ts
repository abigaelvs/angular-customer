export interface CustomerBase {
  custName: string;
  address: string;
  phoneNo: string;
  jenisKelamin: string;
  license: string;
  language: string[];
}
export interface Customer extends CustomerBase {
  id: string;
}