package com.prafull_product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prafull_product.entity.PatientBackup;
import com.prafull_product.repository.PatientBackupRepository;

@Service
public class PatientBackupServiceImpl implements PatientBackupService {

	@Autowired
	private PatientBackupRepository repo;

	@Override
	public List<PatientBackup> getPatient() {
		return repo.findAll();
	}

	@Override
	public void save(PatientBackup patient) {
		repo.save(patient);

	}

	@Override
	public PatientBackup findById(Integer id) {
		return repo.findById(id).get();
	}

	@Override
	public void delete(PatientBackup patient) {
		repo.delete(patient);

	}

}
