import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    await prisma.doctorinfo.createMany({
      data: [
        {
          "id": 1,
          "name": "Dr. Zhang Wei",
          "qualification": "BSc (Hons), MBBS (London), MD (Research)(Imperial College London), FRCS (General Surgery) UK",
          "speciality": "Cardiology",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 3, Unit 301",
          "schedule": {
            "Monday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM"
          }
        },
        {
          "id": 2,
          "name": "Dr. Li Mei",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Pediatrics) UK",
          "speciality": "Pediatrics",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 2, Unit 205",
          "schedule": {
            "Tuesday": "8:00 AM - 4:00 PM",
            "Thursday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 3,
          "name": "Dr. Tanaka Hiroshi",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Orthopedics) UK",
          "speciality": "Orthopedics",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 5, Unit 502",
          "schedule": {
            "Monday": "10:00 AM - 6:00 PM",
            "Wednesday": "10:00 AM - 6:00 PM",
            "Friday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 4,
          "name": "Dr. Kim Min-ji",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Dermatology) UK",
          "speciality": "Dermatology",
          "spoken_language": ["Korean", "English"],
          "office_location": "Floor 1, Unit 103",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
          "id": 5,
          "name": "Dr. Nguyen Van Anh",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Neurology) UK",
          "speciality": "Neurology",
          "spoken_language": ["Vietnamese", "English"],
          "office_location": "Floor 4, Unit 401",
          "schedule": {
            "Monday": "8:00 AM - 4:00 PM",
            "Wednesday": "8:00 AM - 4:00 PM",
            "Friday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 6,
          "name": "Dr. Chen Xiaoling",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Oncology) UK",
          "speciality": "Oncology",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 6, Unit 601",
          "schedule": {
            "Tuesday": "10:00 AM - 6:00 PM",
            "Thursday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 7,
          "name": "Dr. Sato Yuki",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Psychiatry) UK",
          "speciality": "Psychiatry",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 7, Unit 701",
          "schedule": {
            "Monday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM"
          }
        },
        {
          "id": 8,
          "name": "Dr. Wong Siu Ming",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Endocrinology) UK",
          "speciality": "Endocrinology",
          "spoken_language": ["Cantonese", "English"],
          "office_location": "Floor 2, Unit 202",
          "schedule": {
            "Tuesday": "8:00 AM - 4:00 PM",
            "Thursday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 9,
          "name": "Dr. Park Ji-hoon",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Gastroenterology) UK",
          "speciality": "Gastroenterology",
          "spoken_language": ["Korean", "English"],
          "office_location": "Floor 3, Unit 303",
          "schedule": {
            "Monday": "10:00 AM - 6:00 PM",
            "Wednesday": "10:00 AM - 6:00 PM",
            "Friday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 10,
          "name": "Dr. Tran Thi Lan",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Rheumatology) UK",
          "speciality": "Rheumatology",
          "spoken_language": ["Vietnamese", "English"],
          "office_location": "Floor 4, Unit 404",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
          "id": 11,
          "name": "Dr. Liu Yang",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Urology) UK",
          "speciality": "Urology",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 5, Unit 505",
          "schedule": {
            "Monday": "8:00 AM - 4:00 PM",
            "Wednesday": "8:00 AM - 4:00 PM",
            "Friday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 12,
          "name": "Dr. Yamamoto Akira",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Ophthalmology) UK",
          "speciality": "Ophthalmology",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 1, Unit 104",
          "schedule": {
            "Tuesday": "10:00 AM - 6:00 PM",
            "Thursday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 13,
          "name": "Dr. Lee Hye-jin",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Pulmonology) UK",
          "speciality": "Pulmonology",
          "spoken_language": ["Korean", "English"],
          "office_location": "Floor 6, Unit 606",
          "schedule": {
            "Monday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM"
          }
        },
        {
          "id": 14,
          "name": "Dr. Hoang Minh",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Allergy and Immunology) UK",
          "speciality": "Allergy and Immunology",
          "spoken_language": ["Vietnamese", "English"],
          "office_location": "Floor 7, Unit 707",
          "schedule": {
            "Tuesday": "8:00 AM - 4:00 PM",
            "Thursday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 15,
          "name": "Dr. Sunita Patel",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Infectious Disease) UK",
          "speciality": "Infectious Disease",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 2, Unit 203",
          "schedule": {
            "Monday": "10:00 AM - 6:00 PM",
            "Wednesday": "10:00 AM - 6:00 PM",
            "Friday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 16,
          "name": "Dr. Rajesh Kumar",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Cardiology) UK",
          "speciality": "Cardiology",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 3, Unit 302",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
          "id": 17,
          "name": "Dr. Priya Sharma",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Pediatrics) UK",
          "speciality": "Pediatrics",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 2, Unit 206",
          "schedule": {
            "Monday": "8:00 AM - 4:00 PM",
            "Wednesday": "8:00 AM - 4:00 PM",
            "Friday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 18,
          "name": "Dr. Haruto Tanaka",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Orthopedics) UK",
          "speciality": "Orthopedics",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 5, Unit 503",
          "schedule": {
            "Tuesday": "10:00 AM - 6:00 PM",
            "Thursday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 19,
          "name": "Dr. Ananya Das",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Dermatology) UK",
          "speciality": "Dermatology",
          "spoken_language": ["Bengali", "English"],
          "office_location": "Floor 1, Unit 105",
          "schedule": {
            "Monday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM"
          }
        },
        {
          "id": 20,
          "name": "Dr. Ravi Shankar",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Neurology) UK",
          "speciality": "Neurology",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 4, Unit 402",
          "schedule": {
            "Tuesday": "8:00 AM - 4:00 PM",
            "Thursday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 21,
          "name": "Dr. Mei Ling",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Oncology) UK",
          "speciality": "Oncology",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 6, Unit 602",
          "schedule": {
            "Monday": "10:00 AM - 6:00 PM",
            "Wednesday": "10:00 AM - 6:00 PM",
            "Friday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 22,
          "name": "Dr. Hiroshi Nakamura",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Psychiatry) UK",
          "speciality": "Psychiatry",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 7, Unit 702",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
          "id": 23,
          "name": "Dr. Wei Chen",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Endocrinology) UK",
          "speciality": "Endocrinology",
          "spoken_language": ["Mandarin", "English"],
          "office_location": "Floor 2, Unit 204",
          "schedule": {
            "Monday": "8:00 AM - 4:00 PM",
            "Wednesday": "8:00 AM - 4:00 PM",
            "Friday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 24,
          "name": "Dr. Ji-woo Kim",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Gastroenterology) UK",
          "speciality": "Gastroenterology",
          "spoken_language": ["Korean", "English"],
          "office_location": "Floor 3, Unit 304",
          "schedule": {
            "Tuesday": "10:00 AM - 6:00 PM",
            "Thursday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 25,
          "name": "Dr. Minh Nguyen",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Rheumatology) UK",
          "speciality": "Rheumatology",
          "spoken_language": ["Vietnamese", "English"],
          "office_location": "Floor 4, Unit 403",
          "schedule": {
            "Monday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM"
          }
        },
        {
          "id": 26,
          "name": "Dr. Anjali Rao",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Urology) UK",
          "speciality": "Urology",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 5, Unit 506",
          "schedule": {
            "Tuesday": "8:00 AM - 4:00 PM",
            "Thursday": "8:00 AM - 4:00 PM"
          }
        },
        {
          "id": 27,
          "name": "Dr. Yuki Tanaka",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Ophthalmology) UK",
          "speciality": "Ophthalmology",
          "spoken_language": ["Japanese", "English"],
          "office_location": "Floor 1, Unit 106",
          "schedule": {
            "Monday": "10:00 AM - 6:00 PM",
            "Wednesday": "10:00 AM - 6:00 PM",
            "Friday": "10:00 AM - 6:00 PM"
          }
        },
        {
          "id": 28,
          "name": "Dr. Hyeon-ju Park",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Pulmonology) UK",
          "speciality": "Pulmonology",
          "spoken_language": ["Korean", "English"],
          "office_location": "Floor 6, Unit 607",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
          "id": 29,
          "name": "Dr. Linh Nguyen",
          "qualification": "BSc (Hons), MBBS (London), FRCS (Allergy and Immunology) UK",
          "speciality": "Allergy and Immunology",
          "spoken_language": ["Vietnamese", "English"],
          "office_location": "Floor 7, Unit 708, City General",
          "schedule": {
            "Tuesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Saturday": "10:00 AM - 2:00 PM"
          }
        },
        {
            "id": 30,
          "name": "Dr. Arjun Patel",
          "qualification": "MBBS (London), MD (Research)(Imperial College London), FRCS (Infectious Disease) UK",
          "speciality": "Infectious Disease",
          "spoken_language": ["Hindi", "English"],
          "office_location": "Floor 2, Unit 207",
          "schedule": {
            "Tuesday": "10:00 AM - 6:00 PM",
            "Thursday": "10:00 AM - 6:00 PM"
          }
        }
      ],
      skipDuplicates: true,
    });
    console.log("Seeding completed!");
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  