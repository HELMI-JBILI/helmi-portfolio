-- ============================================================================
-- Seed data — real content taken from helmijbilicv.netlify.app, plus the
-- Tunisia Land Surface Analysis Platform description supplied directly by
-- Helmi. Anything not explicitly provided is left as a short editable
-- placeholder ("Add details in Admin → ...") rather than invented.
-- Run AFTER schema.sql. Everything here is editable afterwards from /admin.
-- ============================================================================

-- profile (singleton)
insert into profiles (
  full_name, headline, tagline, bio, story, passions, values_text,
  email, phone, location, university, github_url, linkedin_url, facebook_url,
  research_interests, languages, stats
) values (
  'Helmi Jbili',
  'Computer Science Student & Researcher',
  'AI · Earth Observation · Remote Sensing · Data Science',
  'Computer Science / Software Engineering student at the University of Jendouba, working at the intersection of Artificial Intelligence and Earth Observation. Builds research-grade geospatial platforms and production software systems, with a focus on remote sensing analysis, distributed systems, and applied machine learning.',
  'A software engineering student at the University of Jendouba who thinks in systems, and writes to understand rather than to be heard. Author of three books donated to Arab public libraries, in the belief that knowledge is most valuable when freely shared.',
  'Classical music, tennis, meditation and time outdoors keep the work honest. A Chopin nocturne, a well-placed serve, and enough stillness to listen carefully — the same discipline shows up in the research.',
  'Technology should serve human dignity, or it serves nothing. Collaboration matters because no single mind, however capable, outperforms many aligned toward a shared good.',
  'contact@helmijbili.dev',
  '+216 27 359 052',
  'Tunisia',
  'University of Jendouba',
  'https://github.com/HELMI-JBILI',
  'https://www.linkedin.com/in/helmi-jbili-4912743a2',
  'https://www.facebook.com/hi.lmi.3304673',
  array['Earth Observation','Remote Sensing','Applied Machine Learning','Geospatial Data Science','Distributed Systems'],
  '[{"name":"Arabic","level":"Native"},{"name":"French","level":"Fluent"},{"name":"English","level":"Fluent"}]'::jsonb,
  '{"books":3,"recommendations":7,"projects":4}'::jsonb
);

-- skill_categories
insert into skill_categories (name, slug, display_order) values
  ('Artificial Intelligence', 'ai', 1),
  ('Machine Learning', 'ml', 2),
  ('Deep Learning', 'dl', 3),
  ('Data Science', 'data-science', 4),
  ('Remote Sensing', 'remote-sensing', 5),
  ('GIS / Geospatial Technologies', 'gis', 6),
  ('Programming', 'programming', 7),
  ('Web Development', 'web', 8),
  ('Backend Development', 'backend', 9),
  ('Databases', 'databases', 10),
  ('DevOps / Cloud', 'devops', 11),
  ('Big Data', 'big-data', 12)
on conflict (slug) do nothing;

-- skills (drawn from the "Technical Arsenal" + "Human & Leadership" lists on the old site)
insert into skills (category_id, name, icon, level, description, display_order)
select id, v.name, v.icon, v.level, v.description, v.ord from skill_categories,
  (values
    ('programming', 'JavaScript / Node.js / React', 'code-2', 'Advanced', 'Full-stack development across the JavaScript ecosystem.', 1),
    ('programming', 'Python', 'code-2', 'Advanced', 'Primary language for data science, ML and automation.', 2),
    ('programming', 'PHP', 'code-2', 'Proficient', 'Server-side development for legacy and platform integrations.', 3),
    ('backend', 'Microservices Architecture', 'network', 'Advanced', 'Designing independently deployable, API-gateway-fronted services.', 1),
    ('backend', 'JWT · Application Security', 'shield-check', 'Proficient', 'Authentication, authorization and encrypted data pipelines.', 2),
    ('big-data', 'Big Data Analysis', 'bar-chart-3', 'Proficient', 'Processing and analysing large, multi-source datasets.', 1),
    ('devops', 'Docker · DevOps', 'container', 'Proficient', 'Containerised deployment and service orchestration.', 1),
    ('dl', 'Deep Learning (NVIDIA DLI)', 'brain-circuit', 'Proficient', 'Neural network architectures, training and CUDA-accelerated deployment.', 1),
    ('gis', 'GIS & Spatial Data', 'map', 'Proficient', 'Geospatial analysis and location-intelligent applications.', 1),
    ('remote-sensing', 'Satellite Imagery Analysis', 'satellite', 'Proficient', 'Sentinel-2 processing, spectral indices, change detection.', 1)
  ) as v(cat_slug, name, icon, level, description, ord)
where skill_categories.slug = v.cat_slug;

-- education
insert into education (institution, degree, field, location, start_date, end_date, is_current, description, display_order) values
  ('University of Jendouba', 'B.Sc. in Computer Science / Software Engineering', 'Software Engineering & Data Science', 'Jendouba, Tunisia', '2022-09-01', null, true, 'Coursework and research spanning distributed systems, microservices, and AI-integrated platforms; active in faculty research initiatives.', 1),
  ('Institut Supérieur d''Informatique du Kef', 'Add details in Admin → Education', 'Computer Science', 'Le Kef, Tunisia', null, null, false, 'Add a description of this program in Admin → Education.', 2);

-- experience
insert into experience (position, organization, location, start_date, is_current, description, technologies, display_order) values
  ('Software Engineering Student & Researcher', 'University of Jendouba', 'Jendouba, Tunisia', '2022-09-01', true, 'Working across distributed systems, microservices and AI-integrated platforms; participates in faculty research initiatives combining software systems with spatial data collection and benchmarking.', array['Python','Node.js','Docker','Microservices'], 1);

-- certifications
insert into certifications (name, organization, issue_date, category, description, display_order) values
  ('Baccalaureate in Computer Science', 'Ministry of Education, Tunisia', null, 'Academic', 'National qualification establishing a rigorous foundation in algorithms, logic and applied programming.', 1),
  ('Deep Learning Fundamentals', 'NVIDIA Deep Learning Institute', null, 'AI / ML', 'Neural network architectures, model training, data preprocessing and CUDA-accelerated deployment.', 2),
  ('Project Management Certification', 'Project Management Institute', null, 'Management', 'Scope planning, risk assessment, agile sprints, stakeholder communication and delivery.', 3);

-- publications (3 books, donated to Arab public libraries — titles not supplied, left as editable placeholders)
insert into publications (title, description, category, publication_date, display_order) values
  ('Add title in Admin → Publications (Book 1)', 'Donated to Arab public libraries. Add a description in Admin → Publications.', 'Book', null, 1),
  ('Add title in Admin → Publications (Book 2)', 'Donated to Arab public libraries. Add a description in Admin → Publications.', 'Book', null, 2),
  ('Add title in Admin → Publications (Book 3)', 'Donated to Arab public libraries. Add a description in Admin → Publications.', 'Book', null, 3);

-- research_projects — the flagship Earth Observation platform, prioritized
insert into research_projects (
  title, slug, summary, full_description, research_type, methods, technologies,
  status, is_priority, featured, published, display_order
) values (
  'Tunisia Land Surface Analysis Platform',
  'tunisia-land-surface-analysis-platform',
  'An implemented Earth Observation platform for monitoring land surface conditions across Tunisia using Sentinel-2 imagery, spectral indices and multi-temporal change detection.',
  'The Tunisia Land Surface Analysis Platform is an implemented Earth Observation system — not a concept — built to monitor land surface conditions across Tunisia from Sentinel-2 satellite imagery. It computes vegetation and moisture indices (NDVI, EVI, NDWI) across multi-temporal image stacks to perform land-cover classification and change detection, supporting environmental monitoring use cases including desertification tracking, drought analysis and natural hazard assessment. The platform combines a geospatial data-processing pipeline with machine learning and deep learning models for classification and forecasting, structured as a reproducible geospatial data science workflow from raw satellite scenes to decision-ready maps and charts.',
  'Earth Observation',
  array['NDVI','EVI','NDWI','Multi-temporal Analysis','Change Detection','Land-cover Classification','Desertification Monitoring','Drought Analysis','Natural Hazard Analysis'],
  array['Python','Sentinel-2','Remote Sensing','Machine Learning','Deep Learning','GIS','Geospatial Data Science'],
  'Implemented',
  true,
  true,
  true,
  1
);

-- projects (from the old site's "Featured Projects")
insert into projects (title, slug, short_description, full_description, category, technologies, github_url, featured, display_order) values
  ('Data Management & Encryption Application', 'data-management-encryption-application',
   'Enterprise-grade application with AES-256 encryption, JWT authentication, multi-role dashboards and real-time audit logging.',
   'A modular Node.js backend paired with a React frontend, built to handle sensitive datasets at scale: an end-to-end encryption pipeline, a multi-role user hierarchy, and real-time audit trails for compliance and traceability.',
   'Security · Data', array['Node.js','React','JWT','AES-256','MongoDB'], 'https://github.com/HELMI-JBILI', true, 1),
  ('Kindergarten Management Platform', 'kindergarten-management-platform',
   'Cloud-native microservices system digitising kindergarten operations: enrollment, attendance, health records, billing and parent communication.',
   'Each operational domain runs as an independent, Docker-containerised service behind an API gateway, allowing the platform to scale per-institution while keeping deployments isolated and fault-tolerant.',
   'Education · Microservices', array['Docker','Node.js','PHP','REST API','MySQL'], 'https://github.com/HELMI-JBILI', false, 2),
  ('Tourism Services Platform', 'tourism-services-platform',
   'A nested-microservices platform where each macro-service (Hotels, Guides, Transport, Experiences) runs its own autonomous micro-layer internally.',
   'Built with Python and Node.js, integrating spatial geo-data for location-based service discovery, real-time availability and multi-language support — a rare nested-microservices architecture designed for global scalability.',
   'Tourism · Microservices', array['Python','Node.js','Spatial Data','Docker','Redis','PostgreSQL'], 'https://github.com/HELMI-JBILI', false, 3);

-- site_settings (singleton)
insert into site_settings (site_title, meta_description) values
  ('Helmi Jbili — Computer Science Researcher · AI & Earth Observation',
   'Research profile and portfolio of Helmi Jbili — Artificial Intelligence, Earth Observation and Remote Sensing, Tunisia.');
