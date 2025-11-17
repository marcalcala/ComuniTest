
print("student information racord")
print("===========================")

student_record = {}

while True:
    print("A - add student record")
    print("B - print all student record")
    print("C - search student record")
    print("D - delete student record")
    print("E - edit student record")
    print("F -  export student record")
    print("G - exit system")

    choice = input("select from the option-->").lower()

    if choice == "a":
        print("\n ADDING STUDENT RECORD")

        id_no = input("please input student ID number --> ")

        fisrt_name = input("please input student first name --> ").upper()
        second_name = input("please input student second name --> ").upper()
        age = input("input your age --> ")
        course = input("input your course --> ").upper()
        section = input("enter your section -->").upper()

        student_record[id_no] = [fisrt_name,second_name,age,course,section]
        print("DATA SAVED SUCCESFULLY")
        continue
    elif choice == "b":
        
        print("PRINTING STUDENT RECORD")
        
        for i, j in student_record.items(): #key - vlues
            print(f"STUDENT ID - {i}, INFORMATION - {j}")


        continue
    elif choice == "c":
        pass
        continue
    elif choice == "d":
        pass
        continue
    elif choice == "e":
        pass
        continue
    elif choice == "f":
        pass
        continue
    elif choice == "g":
        pass
        continue
    else:
        print("INVALID INPUT, please try again")
        continue



