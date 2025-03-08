export interface VolunteeringItem {
	title: string;
	organization: string;
	period: string;
	responsibilities: string[];
}

export const volunteeringData: VolunteeringItem[] = [
	{
		title: 'Technical Event Volunteer',
		organization: 'UPN "Veteran" Jawa Timur Tech Week',
		period: 'October 2023',
		responsibilities: [
			'Assisted in organizing and executing technical workshops for students',
			'Provided technical support during app development competition',
		],
	},
	{
		title: 'Community Developer Mentor',
		organization: 'Coding for Indonesia',
		period: '2023 - Present',
		responsibilities: [
			'Mentored beginner programmers in web development basics',
			'Conducted monthly code reviews and feedback sessions',
		],
	},
];
