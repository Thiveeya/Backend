# Backend

Deploy url:

https://assign-mentor-yuxe.onrender.com

Mentor Api's
GET          /Mentors 
POST         /Mentors 


Student Api's
GET           /Students 
POST          /Students 
To get list of students whose mentors weren't assigned

GET           /Students/no-mentors
To assign or change Mentor for student

PATCH        /Students/assign-mentor/:student-id
To assign mentors for multiple Students

PATCH        /Students/assign-mentor-students
To Assign or Change Mentor for particular student

Pass Mentor ID in request Body

PATCH        /Students/assign-mentor/:student-id 
To Assign mentor for multiple students

Pass Mentor ID and Student ID as list in body

PATCH        /Students/assign-mentor-students 
To get all students of particular Mentor

GET          /Students/mentor-students/:mentor-id 
