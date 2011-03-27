/*  Damas
 *
 * Copyright  Rafael Losada, 2001. 
 */

import java.applet.*; import java.lang.*; import java.awt.*; import java.awt.event.*;
import java.applet.Applet; import java.net.MalformedURLException; import java.net.URL;

public class damas extends Applet implements MouseListener, ItemListener {

     	String F, NUM;
	int zverti; 
	Label horiz, verti;
	int VX, VY, ALTO, vx, vy, luz[][], b[][], fin, M=6, TAM=40,q1,q2;
	Font Fuente0; 
	Color enc, fnd, grana, q;

	public void init() {
		Fuente0=new Font("Arial",Font.PLAIN,14);
      	fin=0; TAM=200/M; 
		vvxy(); iniciales(); luz=new int[M][M]; b=new int[M][M];
		apagar(); update(getGraphics()); dibujaTablero(getGraphics());
		setLayout(new FlowLayout(0));
		zverti=7;
          	/*for (int i=4; i<26; i++) zverti.addItem(Integer.toString(i));
		zverti.select("8"); add(zverti);*/
		enc=new Color(250,250,200); fnd=new Color(146,177,192);
		grana=new Color(220,0,0); 
		//zverti.addItemListener(this);	
		addMouseListener(this);
     	}

	void iniciales() {
		F="CODIGO=234"; 
	}

	void inicio() {
		Fuente0=new Font("Arial",Font.PLAIN,14); 
      	fin=0; TAM=200/M; vvxy(); luz=new int[M][M]; b=new int[M][M];
		q1=175+(int)Math.floor(51*Math.random()); 
		q2=(int)Math.floor(255*Math.random()); 
		q=new Color(q1,q2,255-(q1+q2)/2);
		apagar(); dibujaTablero(getGraphics()); update(getGraphics()); 
	}

	public void apagar(){
          	for (int i=0; i<M; i++) {
               	for (int j=0; j<M; j++) {
				luz[i][j]=-1; b[i][j]=-1;
			}
          	}
	}

	public void start() {
          setBackground(fnd); inicio();
     	}

	public void refresca(Graphics g) {
		g.setColor(fnd); g.fillRect(0,0,562,252); dibujaTablero(getGraphics());
	}

	public void paint(Graphics g) {
		update(g); dibujaTablero(g);
	}

     	public void update(Graphics g) {
         	g.setColor(grana); g.fill3DRect(150,5,30,20,true);
		g.setColor(Color.white); g.fillRect(160,10,10,10);
		g.setFont(Fuente0); g.setColor(Color.yellow); g.drawString("©",195,15);
		int c=0;
		for (int i=0; i<M; i++) {
               	for (int j=0; j<M; j++) {
				ponLuzSombra(i,j,g); 
				if (b[i][j]==1) c=c+1;
			}
          	}
		if (c==M) fin=1;
		if (fin==1) {
			g.setColor(enc); g.fillRect(48,5,100,20);
			for (int j=1; j<100; j++) {
				for (int i=1; i<200; i++) {
					g.setColor(Color.red); g.drawString(F,52,20);
          				g.setColor(grana); g.drawString(F,51,21);
				}
				for (int i=1; i<20; i++) {
					g.setColor(Color.white); g.drawString(F,52,20);
          				g.setColor(grana); g.drawString(F,51,21);
				}
			}
		} else {
			g.setColor(Color.white); g.drawString(" "+Integer.toString(M)+"   D A M A S", 52,20);
		}
	}

     	public void dibujaTablero(Graphics g) {
		vvxy(); g.setColor(Color.black);
          	g.drawLine(VX,VY,VX,VY+ALTO); g.drawLine(VX+ALTO,VY,VX+ALTO,VY+ALTO);
		for (int i=1; i<M; i++) g.drawLine(VX+ALTO*i/M,VY,VX+ALTO*i/M,VY+ALTO);
          	g.drawLine(VX,VY,VX+ALTO,VY); g.drawLine(VX,VY+ALTO,VX+ALTO,VY+ALTO);
          	for (int j=1; j<M; j++) g.drawLine(VX,VY+ALTO*j/M,VX+ALTO,VY+ALTO*j/M);
		g.setColor(Color.black);
     	}
	
	public void vvxy() {
		ALTO=TAM*M; VX=5+(200-ALTO)/2; VY=5+(260-ALTO)/2;
	}

     	public void ponLuzSombra(int columna, int fila, Graphics g) {
		vvxy(); vx=VX+columna*TAM; vy=VY+fila*TAM;
		if (luz[columna][fila]==-1) g.setColor(enc);
		if (luz[columna][fila]>-1) g.setColor(Color.gray);
		if (b[columna][fila]==1) g.setColor(q);
          	g.fillRect(VX+columna*TAM+2,VY+fila*TAM+2,TAM-2,TAM-2);
     	}

     	public void mousePressed(MouseEvent e) {
		int x=e.getX(); int y=e.getY();
	     	if (fin==1) {
               refresca(getGraphics()); inicio(); 
          	} else {
			if (x>149 && x<181 && y>4 && y<26){
               		refresca(getGraphics()); inicio(); update(getGraphics());
			}
            	if(x>190 && y<20){
                		try {
                    		URL url = new URL("http://www.anarkasis.com/rafa/");
                    		AppletContext appletcontext = getAppletContext();
                    		appletcontext.showDocument(url, "_blank");
                		}
                		catch(MalformedURLException malformedurlexception) { }
           		 }
			vvxy(); int i=(x-VX)/TAM; int j=(y-VY)/TAM; 
			if (luz[i][j]==-1 && b[i][j]==-1 && y>VY-1) {
				b[i][j]=1; 
				for (int k=0; k<M; k++) {
					if (k!=i) luz[k][j]=luz[k][j]+1;
					if (k!=j) luz[i][k]=luz[i][k]+1;
				}
				for (int k=1; k<M; k++) {
					try {
						luz[i-k][j-k]=luz[i-k][j-k]+1;
					} catch(Exception ex) {}
					try {
						luz[i-k][j+k]=luz[i-k][j+k]+1;
					} catch(Exception ex) {}
					try {
						luz[i+k][j-k]=luz[i+k][j-k]+1;
					} catch(Exception ex) {}
					try {
						luz[i+k][j+k]=luz[i+k][j+k]+1;
					} catch(Exception ex) {}
				}
			} else if (b[i][j]==1 && y>VY-1) {
				b[i][j]=-1; luz[i][j]=-1;
				for (int k=0; k<M; k++) {
					if (k!=i) luz[k][j]=luz[k][j]-1;
					if (k!=j) luz[i][k]=luz[i][k]-1;
				}
				for (int k=1; k<M; k++) {
					try {
						luz[i-k][j-k]=luz[i-k][j-k]-1;
					} catch(Exception ex) {}
					try {
						luz[i-k][j+k]=luz[i-k][j+k]-1;
					} catch(Exception ex) {}
					try {
						luz[i+k][j-k]=luz[i+k][j-k]-1;
					} catch(Exception ex) {}
					try {
						luz[i+k][j+k]=luz[i+k][j+k]-1;
					} catch(Exception ex) {}
				}
			}
          	}
		update(getGraphics());
	}

     	public void itemStateChanged(ItemEvent e) {
		//if (e.getItemSelectable()==zverti) M=zverti.getSelectedIndex()+4;
            refresca(getGraphics()); inicio(); 
		vvxy(); refresca(getGraphics()); dibujaTablero(getGraphics()); update(getGraphics());
     	}

     	public void mouseClicked(MouseEvent e) {}
     	public void mouseEntered(MouseEvent e) {}
     	public void mouseReleased(MouseEvent e) {}
     	public void mouseExited(MouseEvent e) {}

}

