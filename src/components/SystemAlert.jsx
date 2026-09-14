import { ScanLine } from 'lucide-react';
export default function SystemAlert({ title = 'SYSTEM ALERT', children, className = '' }) { return <section className={`system-alert panel ${className}`}><div className="panel-heading"><ScanLine size={28}/>{title}</div>{children}</section>; }
