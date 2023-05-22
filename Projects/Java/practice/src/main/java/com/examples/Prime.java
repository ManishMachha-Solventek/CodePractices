package com.examples;

import java.util.Scanner;

public class Prime {
    public static void main(String[] args) {
        int key;
        boolean flag = true;
        try (Scanner sc = new Scanner(System.in)) {
            while (true) {
                System.out.print("Enter number to check: ");
                key = sc.nextInt();
                for (int j = 2; j <= key / 2; j++) {
                    if (key % j == 0) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    System.out.println(key + " is prime");
                } else {
                    System.out.println(key + " is composite");
                }
            }
        }
    }
}
