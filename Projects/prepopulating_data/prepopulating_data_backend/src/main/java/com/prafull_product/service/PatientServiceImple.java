package com.prafull_product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prafull_product.entity.Patient;
import com.prafull_product.repository.PatientRepository;

@Service
public class PatientServiceImple implements PatientService{
    
	@Autowired
	private PatientRepository patientRepo;
	
	@Override
	public List<Patient> getPatient() {
		return patientRepo.findAll();
	}
	@Override
	public void save (Patient patient) {
		patientRepo.save(patient);
	}
	@Override
	public Patient findById(Integer id) {
		return patientRepo.findById(id).get();
	}
	@Override
	public void delete(Patient patient) {
		patientRepo.delete(patient);
	}
	

	
}
