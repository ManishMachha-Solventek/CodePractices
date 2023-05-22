package com.prafull_product.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prafull_product.entity.Patient;
import com.prafull_product.entity.PatientBackup;
import com.prafull_product.response.PatientDao;
import com.prafull_product.service.PatientBackupServiceImpl;
import com.prafull_product.service.PatientService;

@RestController
@RequestMapping("patients")
@CrossOrigin("*")
public class PatientController {

	@Autowired
	private PatientService patientService;

	@Autowired
	private PatientDao patientDao;

	@Autowired
	private PatientBackupServiceImpl backupServiceImpl;

	@GetMapping("")
	public ResponseEntity<?> getPatient() {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<Patient> patientList = patientService.getPatient();
		if (!patientList.isEmpty()) {
			map.put("status", 1);
			map.put("data", patientList);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.clear();
			map.put("status", 0);
			map.put("message", "Data is not found");
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	@GetMapping("prepopulate")
	public ResponseEntity<?> prepopulate() {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		List<PatientBackup> patientList = backupServiceImpl.getPatient();
		Patient patientBackup = new Patient();
		if (!patientList.isEmpty()) {
			for (int i = 0; i < patientList.size(); i++) {
				patientBackup.setId(patientList.get(i).getId());
				patientBackup.setAge(patientList.get(i).getAge());
				patientBackup.setFname(patientList.get(i).getFname());
				patientBackup.setLname(patientList.get(i).getLname());
				patientBackup.setGender(patientList.get(i).getGender());
				patientBackup.setEmail(patientList.get(i).getEmail());
				patientBackup.setPhone(patientList.get(i).getPhone());
				patientBackup.setUsername(patientList.get(i).getUsername());
				patientBackup.setPassword(patientList.get(i).getPassword());
				if (!patientDao.existsPatientByEmail(patientBackup.getEmail())) {
					savePatient(patientBackup);
					patientDao.updatePatientIdByEmail(patientList.get(i).getId(), patientList.get(i).getEmail());
				}
			}
			map.put("status", 1);
			map.put("data", patientList);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.clear();
			map.put("status", 0);
			map.put("message", "Data is not found");
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	@PostMapping("")
	public ResponseEntity<?> savePatient(@RequestBody Patient patient) {

		Map<String, Object> map = new LinkedHashMap<String, Object>();
		PatientBackup patientBackup = new PatientBackup();
		patientBackup.setId(patient.getId());
		patientBackup.setAge(patient.getAge());
		patientBackup.setFname(patient.getFname());
		patientBackup.setLname(patient.getLname());
		patientBackup.setGender(patient.getGender());
		patientBackup.setEmail(patient.getEmail());
		patientBackup.setPhone(patient.getPhone());
		patientBackup.setUsername(patient.getUsername());
		patientBackup.setPassword(patient.getPassword());

		patientService.save(patient);

		if (!patientDao.existsPatientByEmail(patientBackup.getEmail())) {
			backupServiceImpl.save(patientBackup);
		}

		map.put("status", 1);
		map.put("message", "Record is Saved Successfully!");
		return new ResponseEntity<>(map, HttpStatus.CREATED);
	}

	@GetMapping("{id}")
	public ResponseEntity<?> getPatientById(@PathVariable Integer id) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			Patient patient = patientService.findById(id);
			map.put("status", 1);
			map.put("data", patient);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception ex) {
			map.clear();
			map.put("status", 0);
			map.put("message", "Data is not found");
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> deletePatient(@PathVariable Integer id) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			Patient patient = patientService.findById(id);
			patientService.delete(patient);
			map.put("status", 1);
			map.put("message", "Record is deleted successfully!");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception ex) {
			map.clear();
			map.put("status", 0);
			map.put("message", "Data is not found");
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("deleteall")
	public ResponseEntity<?> deleteAllPatients() {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			patientDao.deleteAll();
			map.put("status", 1);
			map.put("message", "All records deleted successfully!");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception ex) {
			map.clear();
			map.put("status", 0);
			map.put("message", "Data is not found");
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("{id}")
	public ResponseEntity<?> updatePatientById(@PathVariable Integer id, @RequestBody Patient patientDetail) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			Patient patient = patientService.findById(id);
			patient.setId(patientDetail.getId());
			patient.setFname(patientDetail.getFname());
			patient.setLname(patientDetail.getLname());
			patient.setAge(patientDetail.getAge());
			patient.setEmail(patientDetail.getEmail());
			patient.setGender(patientDetail.getGender());
			patient.setPhone(patientDetail.getPhone());
			patientService.save(patient);
			map.put("status", 1);
			map.put("message","updated successfully");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception ex) {
			map.clear();
			map.put("status", 0);
			map.put("message", ex.getMessage());
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/login/{username}/{password}")
	public ResponseEntity<?> findByUsernameAndPassword(@PathVariable Map<String, String> pathVars) {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			Patient patient = patientDao.findByUsernameAndPassword(pathVars.get("username"), pathVars.get("password"));
			if (patient == null) {
				map.put("status", 0);
				map.put("data", false);
				return new ResponseEntity<>(map, HttpStatus.OK);
			} else {
				map.put("status", 1);
				map.put("data", true);
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
		} catch (Exception e) {
			map.clear();
			map.put("status", 0);
			map.put("message", e.getMessage());
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}
}
