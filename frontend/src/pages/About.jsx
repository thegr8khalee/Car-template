import React from 'react';
import branding from '../config/branding';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Heart, MapPin, Phone, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const About = () => {
  const companyName = branding.company.name;
  const legalName = branding.company.legalName;
  const tagline = branding.company.tagline;
  const ceoName = branding.company.ceo?.name ?? 'Our CEO';
  const ceoBio = branding.company.ceo?.bio ?? '';
  const contactInfo = branding.contact ?? {};
  const address = contactInfo.address ?? {};
  const addressText =
    address.formatted ||
    [address.line1, address.line2, address.city, address.region, address.country]
      .filter(Boolean)
      .join(', ');

  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Quality First',
      description: 'Every vehicle in our inventory undergoes rigorous inspection to ensure the highest standards of quality and reliability.',
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Customer Focused',
      description: 'We put our customers at the heart of everything we do, delivering personalized service and transparent dealings.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Expert Team',
      description: 'Our passionate team of automotive professionals brings years of experience and deep industry knowledge.',
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: 'Trusted Reputation',
      description: 'Built on integrity and trust, we have earned the confidence of countless satisfied customers over the years.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white mt-20 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold font-['Microgramma_D_Extended'] mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            About <span className="text-primary">{companyName}</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {tagline}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-base-content/80 leading-relaxed">
              <p>
                {companyName} was founded with a simple yet powerful vision — to make the
                car buying and selling experience seamless, transparent, and enjoyable.
                What started as a small operation has grown into a trusted name in the
                automotive industry.
              </p>
              <p>
                At {legalName}, we believe that finding the right vehicle should
                be an exciting journey, not a stressful ordeal. That is why we have built
                a platform that combines a carefully curated inventory with honest pricing
                and exceptional customer service.
              </p>
              <p>
                Whether you are looking for a luxury sedan, a rugged SUV, or a reliable
                daily driver, our diverse selection has something for everyone. We take
                pride in offering vehicles that meet our strict quality standards, ensuring
                every customer drives away with confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 bg-base-200">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-10 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      {ceoBio && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Leadership</h2>
              <div className="bg-base-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-2">{ceoName}</h3>
                <p className="text-sm text-primary font-medium mb-4">
                  Chief Executive Officer
                </p>
                <p className="text-base-content/80 leading-relaxed">{ceoBio}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      <section className="py-16 px-6 bg-base-200">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {addressText && (
              <motion.div
                className="flex items-start gap-3 text-left max-w-xs"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span className="text-base-content/80 text-sm">{addressText}</span>
              </motion.div>
            )}
            {contactInfo.phones?.main && (
              <motion.div
                className="flex items-center gap-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href={`tel:${contactInfo.phones.main.value}`}
                  className="text-base-content/80 text-sm hover:text-primary transition-colors"
                >
                  {contactInfo.phones.main.display}
                </a>
              </motion.div>
            )}
            {contactInfo.emails?.info && (
              <motion.div
                className="flex items-center gap-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href={`mailto:${contactInfo.emails.info}`}
                  className="text-base-content/80 text-sm hover:text-primary transition-colors"
                >
                  {contactInfo.emails.info}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-base-content/50 text-center">
            This website is built for demonstration purposes only. All company
            information, contact details, and vehicle listings are fictional and
            do not represent a real business.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
