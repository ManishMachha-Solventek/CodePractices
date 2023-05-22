package com.examples;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class removeDuplicates {
    public static void main(String[] args) {
        Integer[] arr = { 10, 20, 30, 20, 40, 10, 20 };
        Integer arr1[] = new Integer[arr.length];
        List<Integer> list = Arrays.asList(arr);
        System.out.println("Original array: " + list);
        Set<Integer> set = new TreeSet<Integer>();
        set.addAll(list);
        System.out.println("Unique array: " + set);

        // to get duplicate elements
        for (int i = 0; i < arr.length; i++) {
            int key = arr[i];
            for (int j = i + 1; j < arr.length; j++) {
                if (key == arr[j]) {
                    arr1[i] = arr[i];
                    break;
                }
            }
        }
        
        List<Integer> list1 = Arrays.asList(arr1);
        Set<Integer> set1 = new HashSet<Integer>();
        set1.addAll(list1);
        set1.removeIf(val -> val == null);
        System.out.println("Duplicate elements: " + set1);

    }
}
