package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Student {
    @Id
    private int rollno;
    private String name;
    private int marks;
    @OneToOne
    private Laptop laptop;

    public int getRollno() {
        return this.rollno;
    }

    public void setRollno(int rollno) {
        this.rollno = rollno;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMarks() {
        return this.marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public Laptop getLaptop() {
        return this.laptop;
    }

    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }
}
