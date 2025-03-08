export interface CertificationItem {
	title: string;
	issuer: string;
	issueDate: string;
	url?: string;
}

export const certificationData: CertificationItem[] = [
	{
		title: 'Android Development',
		issuer: 'Google Developer Certification',
		issueDate: 'Issued December 2023',
		url: '#', // Ganti dengan URL asli nantinya
	},
	{
		title: 'Flutter Development',
		issuer: 'Dicoding Indonesia',
		issueDate: 'Issued March 2023',
		url: '#',
	},
	{
		title: 'Backend Development with Node.js',
		issuer: 'freeCodeCamp',
		issueDate: 'Issued September 2023',
		url: '#',
	},
];
