package com.examples;

import java.util.ArrayList;
import java.util.List;

public class Fib {

    public static void main(String[] args) {
        long first = 0;
        long second = 1;
        long temp;
        long key = 1346269;
        List<Long> list = new ArrayList<Long>();
        for (long i = 2; i <= 50; i++) {
            temp = first + second;
            first = second;
            second = temp;
            list.add(temp);
        }
        System.out.println(list);

        if (list.contains(key)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}