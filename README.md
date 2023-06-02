## Problem Statement:

● Create Login API
● Create Tambola ticket Create API*(No of tickets will be variable not a fixed number). 
Return a Unique id on the Creation of the ticket.
● Create a Tambola ticket fetch API to fetch all the ticket lists associated with the 
Respective ID with pagination.
Tambola Ticket Generator Rules:
● The numbers 1 to 90 are used once only.
● In the first column are the numbers 1 to 9, the second column has numbers 
10 to 19, etc, all the way to the 9th column which has numbers 80 to 90 in it.
● Every row must have exactly 5 numbers in it.
● In a specific column, numbers must be arranged in ascending order from top 
to bottom.
● All the numbers 1 to 90 are used only once in each set of 6 tickets.
● Each column must have at least 1 number
● Blank Cell fill by zero or “x”

# Conditions:

● Database Use(MongoDB/MySQL)
● All injection type & DataBase attacks must be prevented
● Coding architecture & style must be Production Graded.
● Do not use any dedicated package for ticket generation. 
● Each ticket has to be unique
● Only Use Node.JS
