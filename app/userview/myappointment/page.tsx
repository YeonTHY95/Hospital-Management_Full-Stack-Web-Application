import React from 'react';
import prisma from '@/lib/prisma';
import {redirect} from 'next/navigation';
import DoctorAppointmentComponent from '@/components/doctorAppointmentComponent';
import SearchByName from '@/components/searchByNameForm';
import PatientAppointmentComponent from '@/components/patientAppointmentComponent';

const MyAppointment = async ({ searchParams} : { searchParams : Promise<{ username:string, role : string, searchByName : string | undefined}>}) => {

  const {username,role, searchByName} =  await searchParams;
  var upcomingAppointments;
  var historicalAppointments;

  if (searchByName === undefined) {
    ////////////////// For Upcoming Appointments ///////////////////////

    const userinfoForUpcomingAppointments = await prisma.user.findFirst({
      where : {
        username : username
      },
      select : {
        username : true,
        Appointment : {
          where : {
            OR : [
              {
                status : {
                  equals : "Pending Doctor's Confirmation"
                }
              },
              {
                status : {
                  equals : "Confirmed by Doctor"
                }
              }

            ]
            
          }
        }
      }
    });

    if(!userinfoForUpcomingAppointments) {
      // It could be a doctor
      const doctorinfoForUpcomingAppointments = await prisma.doctor.findFirst({
        where : {
          username : username
        },
        select : {
          username : true,
          Appointment : {
            where : {
              OR : [
                {
                  status : {
                    equals : "Pending Doctor's Confirmation"
                  }
                },
                {
                  status : {
                    equals : "Confirmed by Doctor"
                  }
                }
    
              ]
              
            }
          }
        }
      });
      if (doctorinfoForUpcomingAppointments) {
        upcomingAppointments = doctorinfoForUpcomingAppointments.Appointment;
        console.log(`Upcoming Appointments from ${role} ${username} is ${upcomingAppointments}`);
      }
      else {
        console.log("User does not exist");
        redirect('/signin');
      }
    }
    else {
      // It is a patient
      upcomingAppointments = userinfoForUpcomingAppointments.Appointment;
      console.log(`Upcoming Appointments from ${role} ${username} is ${upcomingAppointments}`);
    }

    ////////////////// For Historical Appointments ///////////////////////

    const userinfoForHistoricalAppointments = await prisma.user.findFirst({
      where : {
        username : username
      },
      select : {
        username : true,
        Appointment : {
          where : {
            OR : [
              {
                status : {
                  equals : "Cancelled"
                }
              },
              {
                status : {
                  equals : "Completed"
                }
              }

            ]
            
          }
        }
      }
    });

    if(!userinfoForHistoricalAppointments) {
      // It could be a doctor
      const doctorinfoForHistoricalAppointments = await prisma.doctor.findFirst({
        where : {
          username : username
        },
        select : {
          username : true,
          Appointment : {
            where : {
              OR : [
                {
                  status : {
                    equals : "Cancelled"
                  }
                },
                {
                  status : {
                    equals : "Completed"
                  }
                }
    
              ]
              
            }
          }
        }
      });
      if (doctorinfoForHistoricalAppointments) {
        historicalAppointments = doctorinfoForHistoricalAppointments.Appointment;
        console.log(`Historical Appointments from ${role} ${username} is ${historicalAppointments}`);
      }
      else {
        console.log("User does not exist");
        redirect('/signin');
      }
    }
    else {
      // It is a patient
      historicalAppointments = userinfoForHistoricalAppointments.Appointment;
      console.log(`Historical Appointments from ${role} ${username} is ${historicalAppointments}`);
    }
  }

  else {
    ////////////////// For Upcoming Appointments with Search by Name ///////////////////////

  const userinfoForUpcomingAppointments = await prisma.user.findFirst({
    where : {
      username : username
    },
    select : {
      username : true,
      Appointment : {
        where : {
          OR : [
            {
              status : {
                equals : "Pending Doctor's Confirmation"
              },
              doctorName : {
                equals : searchByName
              }
            },
            {
              status : {
                equals : "Confirmed by Doctor"
              },
              doctorName : {
                equals : searchByName
              }
            }

          ]
          
        }
      }
    }
  });

  if(!userinfoForUpcomingAppointments) {
    // It could be a doctor
    const doctorinfoForUpcomingAppointments = await prisma.doctor.findFirst({
      where : {
        username : username
      },
      select : {
        username : true,
        Appointment : {
          where : {
            OR : [
              {
                status : {
                  equals : "Pending Doctor's Confirmation"
                },
                patientName : {
                  equals : searchByName
                }
              },
              {
                status : {
                  equals : "Confirmed by Doctor"
                },
                patientName : {
                  equals : searchByName
                }
              }
  
            ]
            
          }
        }
      }
    });
    if (doctorinfoForUpcomingAppointments) {
      upcomingAppointments = doctorinfoForUpcomingAppointments.Appointment;
      console.log(`Upcoming Appointments from ${role} ${username} is ${upcomingAppointments}`);
    }
    else {
      console.log("User does not exist");
      redirect('/signin');
    }
  }
  else {
    // It is a patient
    upcomingAppointments = userinfoForUpcomingAppointments.Appointment;
    console.log(`Upcoming Appointments from ${role} ${username} is ${upcomingAppointments}`);
  }

  ////////////////// For Historical Appointments with Search by Name ///////////////////////

  const userinfoForHistoricalAppointments = await prisma.user.findFirst({
    where : {
      username : username
    },
    select : {
      username : true,
      Appointment : {
        where : {
          OR : [
            {
              status : {
                equals : "Cancelled"
              },
              doctorName : {
                equals : searchByName
              }
            },
            {
              status : {
                equals : "Completed"
              },
              doctorName : {
                equals : searchByName
              }
            }

          ]
          
        }
      }
    }
  });

  if(!userinfoForHistoricalAppointments) {
    // It could be a doctor
    const doctorinfoForHistoricalAppointments = await prisma.doctor.findFirst({
      where : {
        username : username
      },
      select : {
        username : true,
        Appointment : {
          where : {
            OR : [
              {
                status : {
                  equals : "Cancelled"
                },
                patientName : {
                  equals : searchByName
                }
              },
              {
                status : {
                  equals : "Completed"
                },
                patientName : {
                  equals : searchByName
                }
              }
  
            ]
            
          }
        }
      }
    });
    if (doctorinfoForHistoricalAppointments) {
      historicalAppointments = doctorinfoForHistoricalAppointments.Appointment;
      console.log(`Historical Appointments from ${role} ${username} is ${historicalAppointments}`);
    }
    else {
      console.log("User does not exist");
      redirect('/signin');
    }
  }
  else {
    // It is a patient
    historicalAppointments = userinfoForHistoricalAppointments.Appointment;
    console.log(`Historical Appointments from ${role} ${username} is ${historicalAppointments}`);
  }
  }



  var nameList:string[] = [];
  if (role === "Patient") {
    historicalAppointments.map( appointment => {
      nameList.push(appointment.doctorName);
    })
    upcomingAppointments.map(appointment => {
      
      nameList.push(appointment.doctorName); 
    });
  }
  else if (role === "Doctor") {
    historicalAppointments.map( appointment => {
      nameList.push(appointment.patientName);
    })
    upcomingAppointments.map(appointment => {
      
      nameList.push(appointment.patientName);
    });
  }

  const uniqueNameList = [...new Set(nameList)];
  



  return (
    <div>
      <div>
          <SearchByName fetchNameList = {uniqueNameList} username={username} role={role} />
      </div>
      {
        (role === "Patient") ?
        <div>
          <div className='flex flex-col justify-center items-center w-full'>
            <h1 className='text-5xl font-bold m-[10px]'>Upcoming Appointment</h1>
            <div className='border-3 border-black rounded-md min-h-[300px] flex flex-col justify-center items-center w-full max-w-[90%]'> 
              {
                upcomingAppointments.length > 0 ? upcomingAppointments.map( (appointment) => (
                  <PatientAppointmentComponent 
                  key={appointment.appointmentID} 
                  appointmentID={appointment.appointmentID} 
                  doctorName={appointment.doctorName}
                  contactNumber={appointment.contactNumber} 
                  appointmentDate={appointment.appointmentDate.toISOString().split("T")[0]} 
                  symptom={appointment.symptom} 
                  status={appointment.status} />
                )) : <div><p className='text-3xl font-bold'>No Appointment Yet</p></div>
              }
                
            </div>

          </div>
          <div className='flex flex-col justify-center items-center w-full'>
            <h1 className='text-5xl font-bold m-[10px]'>Historical Appointment</h1>
            <div className='border-3 border-black rounded-md min-h-[300px] flex flex-col justify-center items-center w-full max-w-[90%]'> 
              {
              
                  historicalAppointments.length > 0 ? historicalAppointments.map( (appointment) => (
                    <PatientAppointmentComponent 
                    key={appointment.appointmentID} 
                    appointmentID={appointment.appointmentID} 
                    doctorName={appointment.doctorName}
                    contactNumber={appointment.contactNumber} 
                    appointmentDate={appointment.appointmentDate.toISOString().split("T")[0]} 
                    symptom={appointment.symptom} 
                    status={appointment.status} />
                  )) : <div><p className='text-3xl font-bold'>No Historical Appointment</p></div>
                }
              </div>
          </div>
        </div> 
        : role === "Doctor" &&
        <div>
          <div className='flex flex-col justify-center items-center w-full'>
            <h1 className='text-5xl font-bold m-[10px]'>Upcoming Appointment</h1>
            <div className='border-3 border-black rounded-md min-h-[300px] flex flex-col justify-center items-center w-full max-w-[90%]'> 
              {
                upcomingAppointments.length > 0 ? upcomingAppointments.map((appointment) => (
                  <DoctorAppointmentComponent 
                    key={appointment.appointmentID} 
                    appointmentID={appointment.appointmentID} 
                    patientName={appointment.patientName}
                    contactNumber={appointment.contactNumber} 
                    appointmentDate={appointment.appointmentDate.toISOString().split("T")[0]} 
                    symptom={appointment.symptom} 
                    status={appointment.status}
                    reportDetails = {appointment.details}
                  />
                )) : <div><p className='text-3xl font-bold'>No Appointment Yet</p></div>

              }
            </div>

          </div>
          
          <div className='flex flex-col justify-center items-center w-full'>
            <h1 className='text-5xl font-bold m-[10px]'>Historical Appointment</h1>
            <div className='border-3 border-black rounded-md min-h-[300px] flex flex-col justify-center items-center w-full max-w-[90%]'> 
              {
                historicalAppointments.length > 0 ? historicalAppointments.map((appointment) => (
                  <DoctorAppointmentComponent 
                    key={appointment.appointmentID} 
                    appointmentID={appointment.appointmentID} 
                    patientName={appointment.patientName}
                    contactNumber={appointment.contactNumber} 
                    appointmentDate={appointment.appointmentDate.toISOString().split("T")[0]} 
                    symptom={appointment.symptom} 
                    status={appointment.status}
                    reportDetails = {appointment.details}
                  />
                )) : <div><p className='text-3xl font-bold'>No Historical Appointment</p></div>

              }
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default MyAppointment